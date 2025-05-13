export const convertToSlug = (text: string): string => {  
    return text  
        .toLowerCase() // Convert to lowercase  
        .trim() // Remove whitespace at the start and end  
        .normalize('NFD') // Normalize string to decompose accented characters  
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks (accents)  
        .replace(/[^a-z0-9\s-]/g, '') // Remove all non-alphanumeric characters (except spaces and hyphens)  
        .replace(/\s+/g, '-') // Replace spaces with hyphens  
        .replace(/-+/g, '-') // Replace multiple hyphens with a single one  
}
  
