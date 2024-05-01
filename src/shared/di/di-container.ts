class DIContainer {
    private static instance: DIContainer;
    private services: { [key: string]: any } = {};

    private constructor() { }

    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer();
        }
        return DIContainer.instance;
    }

    public register<T>(key: string, instance: T): void {
        this.services[key] = instance;
    }

    public resolve<T>(key: string): T {
        if (!this.services[key]) {
            throw new Error(`Service ${key} not found`);
        }
        return this.services[key];
    }
}

export default DIContainer.getInstance();
