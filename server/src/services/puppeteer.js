import puppeteer from "puppeteer";
import mongoose from "mongoose";
import Movie from "../models/movie.model.js";
import dotenv from "dotenv";

dotenv.config();

const ConnectDB = async () => {

    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongoDB is Connected ${connect.connection.host}`);

    } catch (error) {
        console.log("mongodb connection error", error);
    }
}
function yearToDate(year) {
    if (!year) return null;
    return new Date(`${year}-01-01T00:00:00.000Z`);
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function parseISODuration(iso) {
    if (!iso) return null;

    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return null;

    const hours = parseInt(match[1] || "0", 10);
    const minutes = parseInt(match[2] || "0", 10);

    return {
        hours,
        minutes,
        totalMinutes: hours * 60 + minutes,
        human: `${hours}h ${minutes}m`,
    };
}

async function upsertMovie(scrapedMovie) {



    if (!scrapedMovie.duration_minutes) {
        throw new Error("Invalid duration");
    }

    return Movie.findOneAndUpdate(
        { movie_name: scrapedMovie.movie_name },
        {
            movie_name: scrapedMovie.movie_name,
            movie_rating: scrapedMovie.rating,
            movie_release_date: yearToDate(scrapedMovie.release_date),
            movie_duration: scrapedMovie.duration_minutes,
            movie_description: scrapedMovie.description,
            movie_cover_image_url: scrapedMovie.cover_image_url,
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
        }
    );
}


(async () => {

    await ConnectDB();

    const browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await page.goto("https://www.imdb.com/chart/top", {
        waitUntil: "networkidle2",
    });

    // Accept consent
    const consentFrame = page.frames().find(f =>
        f.url().includes("consent")
    );
    if (consentFrame) {
        await consentFrame.click('button[data-testid="accept-button"]');
    }

    await page.waitForSelector('li.ipc-metadata-list-summary-item');

    // STEP 1: list page
    const movies = await page.evaluate(() => {
        return [...document.querySelectorAll(
            'li.ipc-metadata-list-summary-item'
        )].map(el => {
            const title = el.querySelector("h3")?.innerText;
            const rating = el.querySelector(
                '[data-testid="ratingGroup--imdb-rating"] span'
            )?.innerText;
            const url = el.querySelector("a")?.href;

            return {
                name: title?.replace(/^\d+\.\s*/, "") || null,
                rating: rating || null,
                url: url || null,
            };
        });
    });

    const results = [];

    // STEP 2: movie pages
    for (const movie of movies.slice(0, 200)) {
        if (!movie.url) continue;

        const moviePage = await browser.newPage();
        await moviePage.goto(movie.url, { waitUntil: "networkidle2" });

        const extra = await moviePage.evaluate(() => {
            const jsonLdText = document.querySelector(
                'script[type="application/ld+json"]'
            )?.innerText;

            const jsonLd = jsonLdText ? JSON.parse(jsonLdText) : null;

            const releaseYear =
                jsonLd?.datePublished?.split("-")[0] ||
                document.title.match(/\((\d{4})\)/)?.[1] ||
                null;

            const coverImage =
                jsonLd?.image ||
                document.querySelector('meta[property="og:image"]')
                    ?.getAttribute("content") ||
                null;

            const description =
                jsonLd?.description ||
                document.querySelector('[data-testid="plot"] span')
                    ?.innerText ||
                null;

            const duration =
                jsonLd?.duration ||
                document.querySelector(
                    'li[data-testid="title-techspec_runtime"] span'
                )?.innerText ||
                null;

            return {
                releaseYear,
                coverImage,
                description,
                duration,
            };
        });

        const durationParsed = parseISODuration(extra.duration);

        results.push({
            movie_name: movie.name,
            rating: Number(movie.rating),
            release_date: extra.releaseYear,
            duration_minutes: durationParsed?.totalMinutes,
            description: extra.description,
            cover_image_url: extra.coverImage,
        });



        await moviePage.close();
        await delay(2000);
    }

    console.log(results);
    for (const movie of results) {
        try {
            await upsertMovie(movie);
            console.log("Saved:", movie.movie_name);
        } catch (err) {
            console.error("Failed:", movie.movie_name, err.message);
        }
    }
    await mongoose.disconnect();
    await browser.close();
})();




