
import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-tertiary p-4 rounded-md text-sky-300 overflow-x-auto my-4 text-sm">
        <code>{children}</code>
    </pre>
);

const Help: React.FC = () => {
    return (
        <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-accent mb-4">Deploying Your Project to GitHub</h2>
            <p className="text-text-secondary mb-6">
                Follow these steps to upload your web panel project to a new GitHub repository. This guide assumes
                you have Git installed on your local machine and a GitHub account.
            </p>

            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Step 1: Create a New Repository on GitHub</h3>
                    <ol className="list-decimal list-inside text-text-secondary space-y-2">
                        <li>Go to <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">github.com</a> and log in.</li>
                        <li>Click the "+" icon in the top-right corner and select "New repository".</li>
                        <li>Give your repository a name (e.g., `ssh-web-panel`).</li>
                        <li>Choose whether to make it public or private.</li>
                        <li><strong>Do not</strong> initialize with a README, .gitignore, or license. We will create these locally.</li>
                        <li>Click "Create repository".</li>
                    </ol>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Step 2: Initialize a Git Repository Locally</h3>
                    <p className="text-text-secondary mb-2">
                        Navigate to your project's root directory in your terminal and run the following command to initialize it as a Git repository.
                    </p>
                    <CodeBlock>git init -b main</CodeBlock>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Step 3: Add and Commit Your Files</h3>
                    <p className="text-text-secondary mb-2">
                        Add all the project files to the staging area and create your first commit.
                    </p>
                    <CodeBlock>
                        git add .<br />
                        git commit -m "Initial commit: Add SSH web panel application files"
                    </CodeBlock>
                </div>
                
                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Step 4: Link Your Local Repository to GitHub</h3>
                    <p className="text-text-secondary mb-2">
                        Copy the remote repository URL from your GitHub repository page (it looks like `https://github.com/your-username/your-repo-name.git`) and run this command:
                    </p>
                    <CodeBlock>
                        git remote add origin [YOUR_REPOSITORY_URL]
                    </CodeBlock>
                    <p className="text-text-secondary mb-2 mt-4">
                        Verify the remote was added correctly:
                    </p>
                    <CodeBlock>
                        git remote -v
                    </CodeBlock>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Step 5: Push Your Code to GitHub</h3>
                    <p className="text-text-secondary mb-2">
                        Finally, push your local `main` branch to the `origin` remote on GitHub.
                    </p>
                    <CodeBlock>
                        git push -u origin main
                    </CodeBlock>
                    <p className="text-text-secondary mt-4">
                        Now, refresh your GitHub repository page. You should see all your project files!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Help;
