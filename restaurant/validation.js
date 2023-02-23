import joi from '@hapi/joi';

export const restaurantValidationschema = joi.object({
    name: joi.string()
        .label("Restaurant Name")
        .trim()
        .lowercase()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        })
        .min(5)
        .max(50)
        .required(),
    location: joi.string()
        .label("Restaurant Location")
        .trim()
        .lowercase()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        })
        .min(5)
        .max(200)
        .required(),
    phonenumber: joi.string()
        .label("Restaurant Phone Number")
        .required()
        .regex(/^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/) // regex for handling phonw number with country codes if passed
        .messages({
            "string.pattern.base": `{{#label}} is not valid`
        })
        .trim(),
    menu: joi.array()
        .items(
            joi.object({
                menuName: joi.string()
                    .label("Restaurant Menu Name")
                    .required()
                    .regex(/^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/) // regex for handling phonw number with country codes if passed
                    .messages({
                        "string.pattern.base": `{{#label}} is not valid`
                    })
                    .min(5)
                    .max(50)
                    .trim(),

                menuPrice: joi.number()
                    .label("Restaurant Menu Price")
                    .required()
                    .positive()
                    .greater(0),
                imageurl: joi.array()
                    .items(joi.string()
                        .label("Menu Image URL")
                        .trim()
                        .min(5)
                        .max(500)
                    )
                    .label("Restaurant Menu Images")
                    .required()
                    .unique()
                    .min(1),
            }),
        ),
    ratings: joi.array()
        .items(
            joi.object({
                user: joi.string()
                    .label("Restaurant Ratings User-ID")
                    .required()
                    .regex(/^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/) // regex for handling phonw number with country codes if passed
                    .messages({
                        "string.pattern.base": `{{#label}} is not valid`
                    })
                    .min(5)
                    .max(50)
                    .trim(),
                rating: joi.number()
                    .label("Restaurant User Rating")
                    .required()
                    .greater(0)
                    .less(5),
                review: joi.string()
                    .label("Restaurant User Review")
                    .required()
                    .regex(/^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/) // regex for handling phonw number with country codes if passed
                    .messages({
                        "string.pattern.base": `{{#label}} is not valid`
                    })
                    .min(5)
                    .max(200)
                    .trim(),
            }),
        ),
    // subscriptionenddate: joi.date()
    //     .label("Restaurant Subscription End Date")
    //     .iso()
    //     .required()
})