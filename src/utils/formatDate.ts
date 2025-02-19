export const formatDate = (date: number) => {
    const inputDate = new Date(date);
    const today = new Date();
    const diffInMinutes = Math.floor((today.getTime() - inputDate.getTime()) / (1000 * 60));

    // If less than 1 minute ago
    if (diffInMinutes < 1) {
        return 'Ahora';
    }
    // If less than 60 minutes ago
    if (diffInMinutes < 60) {
        return `Hace ${diffInMinutes} minutos`;
    }

    // If less than 24 hours ago
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    }

    // Check if the date is today
    const isToday = inputDate.getFullYear() === today.getFullYear() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getDate() === today.getDate();

    if (isToday) {
        return 'Hoy, ' + new Intl.DateTimeFormat('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);
    }

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    return new Intl.DateTimeFormat('es-ES', options).format(date);
}