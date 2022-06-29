import * as Joi from 'joi';

/**
 * Utility helper for Joi validation.
 *
 * @param <T> data
 * @param <Joi.SchemaLike> schema
 * @returns <Promise>
 */
export default async function validate<T>(
  data: T,
  schema: Joi.SchemaLike
): Promise<void> {
  await Joi.valid(data, schema, { abortEarly: false });
}
