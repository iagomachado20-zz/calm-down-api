class ConfigApp {

    port: string;

    constructor(port) {
        this.port = port;
    }

    public normalizePort() {

        const port = parseInt(this.port, 10);

        if (isNaN(port)) return this.port;

        if(port >= 0) return port;

        return false;

    }

}

export default ConfigApp;