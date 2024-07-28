import { format } from "date-fns";

export const formatDate = (date) => {
    return format(date, 'MMMM do, yyyy, h:mm:ss a');
}
