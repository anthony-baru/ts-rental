import { Schema, } from "joi";

export const validateSchema = (body: object, schema: Schema) => {
    let options = {
        language: {
            key: "{{key}} ",
        },
        abortEarly: false,
    };
    const result = schema.validate(body, options);
    if (result.error) {
        let errors: string[] = [];
        result.error.details.forEach((error) => {
            errors.push(error.message);
        });
        return errors.join(".");
    }
};
