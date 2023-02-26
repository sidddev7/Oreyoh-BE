import joi from '@hapi/joi';

export const productValidationschema = joi.object({
    user: joi.string()
        .label("Post User-Id")
        .trim()
        .lowercase()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        })
        .required(),
    caption: joi.string()
        .label("Post Caption")
        .min(5)
        .max(100)
        .lowercase()
        .required()
        .trim()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        }),
    mediaURLs: joi.array()
        .items(joi.string()
            .label("Post Media URLs")
            .trim()
            .min(5)
            .max(500)
        )
        .label("Product Images")
        .required()
        .unique()
        .min(1),
    likes: joi.array()
        .items(
            joi.object(
                {
                    user: joi.string()
                        .label("Post Likes User-Id")
                        .trim()
                        .lowercase()
                        .regex(/[${};<>`]/, { invert: true })
                        .messages({
                            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
                        })
                        .required(),
                    timeStamp: joi.date()
                        .label("Post User Like Date")
                        .iso()
                        .default(new Date()),
                }
            )
        )
        .label("Posts Likes"),
    // restaurant: joi.string()
    //     .label("Post Restaurants-Id")
    //     .trim()
    //     .lowercase()
    //     .regex(/[${};<>`]/, { invert: true })
    //     .messages({
    //         "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
    //     })
    //     .required(),
})

