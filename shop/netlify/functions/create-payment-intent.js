require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            description: 'test',
            shipping: {
                name: 'Binaya Chaudhary',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            },
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent })
        }
    } catch (error) {
        console.log({ error });

        return {
            status: 400,
            body: JSON.stringify({ error }),
        };
    }
}