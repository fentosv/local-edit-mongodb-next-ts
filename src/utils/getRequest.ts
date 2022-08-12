import axios from 'axios';

interface MyResponseType<T> {
    data: T
}


export const getRequest = async <T>(url: string): Promise<MyResponseType<T>> => {

    const { config, data, headers, request, status, statusText } = await axios.get<T>(
        url,
        {
            headers: {
                Accept: 'application/json',
            },
        },
    )
    return { data }
}
