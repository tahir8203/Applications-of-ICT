import java.util.Properties

plugins { id("com.android.application") }

// Signing key lives OUTSIDE the repository. Point ICT_SIGNING_PROPERTIES at its key.properties.
val signingProps = Properties().apply {
    System.getenv("ICT_SIGNING_PROPERTIES")?.let { p -> file(p).takeIf { it.exists() }?.inputStream()?.use { load(it) } }
}

android {
    namespace = "pk.edu.ict1013"
    compileSdk = 36

    defaultConfig {
        // Stable application ID: never change it, or installed apps cannot update.
        applicationId = "pk.edu.ict1013"
        minSdk = 24
        targetSdk = 36
        versionCode = 2
        versionName = "2.0.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    signingConfigs {
        if (signingProps.getProperty("storeFile") != null) {
            create("release") {
                storeFile = file(signingProps.getProperty("storeFile"))
                storePassword = signingProps.getProperty("storePassword")
                keyAlias = signingProps.getProperty("keyAlias")
                keyPassword = signingProps.getProperty("keyPassword")
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.findByName("release")
                ?: throw GradleException("Release signing key not configured: set ICT_SIGNING_PROPERTIES (see android/README.md).")
        }
    }
}
