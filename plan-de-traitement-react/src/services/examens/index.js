import {
  BASE_EXAMEN_URL,
} from '../../utils/urls';

export const createExamen = async (values) => {
    console.log('Step current Service ', values);
    // try {
    //   const request = await fetch(BASE_EXAMEN_URL, {
    //     method: 'POST',
    //     body: {
    //       searcParams: values.data
    //     }
    //   });
    //   const result = await request.json();
    //   return result;
    // } catch (error) {
    //   console.error('Some Err CreateService:', error);
    // }
    return values;
}