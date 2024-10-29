/**
 * @param {string} startDate 
 * @param {string} endDate 
 * @param {string} interval 
 * @returns {Array<string>} 
 * @throws {Error} 
 */
function generateDateRange(startDate, endDate, interval) {
    const result = [];

    const isValidDate = (dateStr) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateStr)) return false;
        const date = new Date(dateStr);
        return date.toISOString().slice(0, 10) === dateStr;
    };

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
        throw new Error("End date must be after start date.");
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    let currentDate = new Date(start);

    while (currentDate <= end) {
        result.push(formatDate(currentDate));
        switch (interval) {
            case 'daily':
                currentDate.setDate(currentDate.getDate() + 1);
                break;
            case 'weekly':
                currentDate.setDate(currentDate.getDate() + 7);
                break;
            case 'monthly':
                currentDate.setMonth(currentDate.getMonth() + 1);
                break;
            case 'yearly':
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                break;
            default:
                throw new Error("Invalid interval type.");
        }
    }

    return result;
}

document.getElementById('dateRangeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const interval = document.getElementById('interval').value;

    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').innerText = '';
    document.getElementById('totalDays').innerText = '';

    setTimeout(() => { 
        try {
            const dates = generateDateRange(startDate, endDate, interval);
            document.getElementById('result').innerText = `Üretilen Tarihler: ${dates.join(', ')}`;

            const totalDays = dates.length;
            document.getElementById('totalDays').innerText = `Toplam Gün: ${totalDays} gün`;
        } catch (error) {
            document.getElementById('result').innerText = error.message;
        } finally {
            document.getElementById('loading').style.display = 'none';
        }
    }, 1000); 
});
