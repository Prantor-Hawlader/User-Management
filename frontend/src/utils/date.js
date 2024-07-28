import { format } from "date-fns";

export const formatDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
        return 'Invalid date';
    }
    return format(parsedDate, 'MMMM do, yyyy, h:mm:ss a');
}
