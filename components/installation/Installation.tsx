
import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-tertiary p-4 rounded-md text-sky-300 overflow-x-auto my-4 text-sm">
        <code>{children}</code>
    </pre>
);

const Installation: React.FC = () => {
    return (
        <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-accent mb-4">Install SSH Panel on Your VPS</h2>
            <p className="text-text-secondary mb-6">
                This guide provides a single command to install the SSH Web Panel, required services (like OpenSSH and a web server), and a firewall on your Debian-based VPS (e.g., Ubuntu, Debian). The script is interactive and will prompt you for configuration details.
            </p>

            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Step 1: Connect to Your VPS</h3>
                    <p className="text-text-secondary mb-2">
                        First, connect to your server using SSH with a user account that has `sudo` (administrator) privileges.
                    </p>
                    <CodeBlock>ssh your_username@your_vps_ip_address</CodeBlock>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Step 2: Run the Installation Script</h3>
                    <p className="text-text-secondary mb-2">
                        Copy and paste one of the following commands into your terminal. This will download the latest installation script from a public repository and execute it. Choose the command based on whether your VPS has `wget` or `curl` installed.
                    </p>

                    <h4 className="text-lg font-semibold text-text-primary mt-6 mb-2">Using `wget`</h4>
                    <CodeBlock>
                        wget -qO - https://raw.githubusercontent.com/example-user/ssh-panel-installer/main/install.sh | sudo bash
                    </CodeBlock>

                    <h4 className="text-lg font-semibold text-text-primary mt-6 mb-2">Or using `curl`</h4>
                    <CodeBlock>
                        curl -sSL https://raw.githubusercontent.com/example-user/ssh-panel-installer/main/install.sh | sudo bash
                    </CodeBlock>
                    
                    <p className="text-sm text-slate-500 mt-4">
                        Note: It's always a good security practice to inspect scripts from the internet before running them with `sudo`. You can view this script's content by visiting the URL in your browser.
                    </p>
                </div>
                
                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Step 3: Interactive Configuration</h3>
                    <p className="text-text-secondary mb-2">
                        The script will guide you through the setup process. You will be prompted to enter the following information:
                    </p>
                    <ul className="list-disc list-inside text-text-secondary space-y-2 pl-4">
                        <li><strong>Admin Username:</strong> The username for logging into the web panel.</li>
                        <li><strong>Admin Password:</strong> A secure password for the admin account.</li>
                        <li><strong>Domain/Subdomain:</strong> A fully qualified domain name (e.g., `panel.yourdomain.com`) that points to your VPS IP address. This is required for setting up a free TLS certificate with Let's Encrypt.</li>
                        <li><strong>Web Panel Port:</strong> The port you will use to access the web panel (e.g., `443` for standard HTTPS). The script will configure the firewall to allow access to this port.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Step 4: Installation Complete</h3>
                    <p className="text-text-secondary mb-2">
                        Once the script finishes, it will display a summary of your installation details, including:
                    </p>
                    <ul className="list-disc list-inside text-text-secondary space-y-2 pl-4">
                        <li>Your Web Panel URL (e.g., `https://panel.yourdomain.com:PORT`)</li>
                        <li>Your admin username and password.</li>
                    </ul>
                     <p className="text-text-secondary mt-4">
                        <strong>Important:</strong> Save this information in a secure location. You can now access your SSH Web Panel through your browser and start managing your server.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Installation;
