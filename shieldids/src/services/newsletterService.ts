export class NewsletterError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NewsletterError';
    }
}

export const subscribeToNewsletter = async (email: string): Promise<void> => {
    try {
        const response = await fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new NewsletterError(error.message || 'Subscription failed. Please try again later.');
        }
    } catch (error) {
        if (error instanceof NewsletterError) throw error;
        if (error instanceof TypeError) {
            throw new NewsletterError('Network error. Please check your connection.');
        }
        throw new NewsletterError('An unexpected error occurred. Please try again later.');
    }
};
