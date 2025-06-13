import { useApplicationStore } from '@/stores/ApplicationStore';
import type { FetchOptions } from '@/types/core/CoreApi';
import type { OrNull } from '@/types/core/CoreType';

export const makeRequest = async <T>(url: string, options: FetchOptions<T> = {}) => {
    const config = useRuntimeConfig();
};
