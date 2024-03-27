import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
    projectName: 'Effiziente Dashboard',
    logicalId: 'effiziente-monitoring-2',
    repoUrl: 'https://github.com/apis3445/PlaywrightFramework',
    checks: {
        activated: true,
        muted: false,
        runtimeId: '2022.10',
        frequency: Frequency.EVERY_10M,
        locations: ['us-east-1', 'eu-west-1'],
        tags: ['website'],
        checkMatch: '**/__checks__/**/*.check.ts',
        ignoreDirectoriesMatch: [],
        browserChecks: {
            frequency: Frequency.EVERY_10M,
            testMatch: '**/tests/Effiziente/Synthetic/login.spec.ts',
        },
    },
    cli: {
        runLocation: 'eu-west-1',
    }
})