const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const projectRoot = path.join(__dirname, '..');

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    console.log('🚀 Welcome to the Project Rename Wizard! 🚀\n');

    const newName = await question('📦 What is your new project name? (e.g., my-awesome-app): ');
    if (!newName) {
        console.log('❌ Project name is required!');
        rl.close();
        return;
    }

    const newScheme = await question(`🔗 What is your URL scheme? (default: ${newName.toLowerCase().replace(/[^a-z0-9]/g, '')}): `) || newName.toLowerCase().replace(/[^a-z0-9]/g, '');

    const defaultPackage = `com.example.${newName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const newPackage = await question(`🆔 What is your Bundle ID / Package Name? (default: ${defaultPackage}): `) || defaultPackage;

    console.log('\n🔄 Applying changes...');

    // 1. Update app.json
    const appJsonPath = path.join(projectRoot, 'app.json');
    if (fs.existsSync(appJsonPath)) {
        const appJsonRaw = fs.readFileSync(appJsonPath, 'utf8');
        const appJson = JSON.parse(appJsonRaw);

        appJson.expo.name = newName;
        appJson.expo.slug = newName; // Slug usually matches name or safe version
        appJson.expo.scheme = newScheme;

        if (appJson.expo.ios) {
            appJson.expo.ios.bundleIdentifier = newPackage;
        }
        if (appJson.expo.android) {
            appJson.expo.android.package = newPackage;
        }

        fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
        console.log('✅ Updated app.json');
    } else {
        console.log('⚠️ app.json not found!');
    }

    // 2. Update package.json
    const packageJsonPath = path.join(projectRoot, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const packageJsonRaw = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageJsonRaw);

        packageJson.name = newName;

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅ Updated package.json');
    }

    // 3. Update cesconfig.jsonc (if exists, simple regex replace)
    const cesConfigPath = path.join(projectRoot, 'cesconfig.jsonc');
    if (fs.existsSync(cesConfigPath)) {
        let cesConfig = fs.readFileSync(cesConfigPath, 'utf8');
        cesConfig = cesConfig.replace(/"projectName":\s*".*?"/, `"projectName": "${newName}"`);
        fs.writeFileSync(cesConfigPath, cesConfig);
        console.log('✅ Updated cesconfig.jsonc');
    }

    // 4. Remove ios and android directories
    const iosDir = path.join(projectRoot, 'ios');
    const androidDir = path.join(projectRoot, 'android');

    if (fs.existsSync(iosDir)) {
        console.log('🗑️  Removing ios directory (will be regenerated)...');
        fs.rmSync(iosDir, { recursive: true, force: true });
    }

    if (fs.existsSync(androidDir)) {
        console.log('🗑️  Removing android directory (will be regenerated)...');
        fs.rmSync(androidDir, { recursive: true, force: true });
    }

    // 5. Re-initialize Git
    const initGit = await question('🆕 Do you want to re-initialize the Git repository? (y/N): ');
    if (initGit.toLowerCase() === 'y') {
        try {
            console.log('\n🔄 Re-initializing Git repository...');
            const gitDir = path.join(projectRoot, '.git');
            if (fs.existsSync(gitDir)) {
                fs.rmSync(gitDir, { recursive: true, force: true });
            }

            execSync('git init', { cwd: projectRoot, stdio: 'inherit' });
            execSync('git add .', { cwd: projectRoot, stdio: 'inherit' });
            execSync(`git commit -m "feat: initial commit of ${newName}"`, { cwd: projectRoot, stdio: 'inherit' });

            console.log('✅ Git repository re-initialized with initial commit.');
        } catch (error) {
            console.error('❌ Failed to re-initialize Git:', error.message);
        }
    }

    console.log('\n🎉 Rename complete!');
    console.log(`\n👉 Next steps:`);
    console.log(`   1. Run "npm install" (if you haven't)`);
    console.log(`   2. Run "npm run reset" to regenerate native folders`);
    console.log(`   3. Update your .env file based on .env.example\n`);

    rl.close();
}

main();
