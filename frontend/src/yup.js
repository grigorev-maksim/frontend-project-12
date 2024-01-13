import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'errors.required',
    oneOf: 'errors.notTheSame',
    notOneOf: 'errors.notUniqueChannel',
  },
  string: {
    min: 'errors.notInRange',
    max: 'errors.notInRange',
  },
});

const getChannelNameSchema = (channels) => Yup.object().shape({
  body: Yup.string()
    .min(3)
    .max(20)
    .required()
    .notOneOf(channels),
});

export default getChannelNameSchema;
