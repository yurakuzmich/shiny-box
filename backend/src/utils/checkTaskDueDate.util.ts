export const checkTaskDueDate = (dueDate: string) => {
    try {
        const dueDateObj = new Date(dueDate);
        const now = new Date();

        if (dueDateObj.toISOString() !== dueDate) {
            return false;
        }

        dueDateObj.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);

        return dueDateObj >= now;
    } catch (error) {
        return false;
    }
}
