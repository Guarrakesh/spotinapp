package it.spotin;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.horcrux.svg.SvgPackage;
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.microsoft.codepush.react.CodePush;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;

import com.microsoft.codepush.react.CodePush;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
//import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.reactnative.push.AppCenterReactNativePushPackage;

import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;

import java.util.Arrays;
import java.util.List;

import it.spotin.BuildConfig;
import it.spotin.R;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage(),
            new ReanimatedPackage(),
            new SvgPackage(),
            new RNAndroidLocationEnablerPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage(),
            new ReactNativePushNotificationPackage(),
            new MapsPackage(),
            new RNFusedLocationPackage(),
            new RNFirebasePackage(),

            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
            new AndroidOpenSettingsPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNFirebaseAnalyticsPackage(),
            new AppCenterReactNativePushPackage(MainApplication.this),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(MainApplication.this),

            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
            new FBSDKPackage(mCallbackManager)
      );
    }
    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {

    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
