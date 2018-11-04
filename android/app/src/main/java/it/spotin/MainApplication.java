    package it.spotin;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
import com.microsoft.codepush.react.CodePush;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;

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
            new ReactNativeConfigPackage(),
            new RNDeviceInfo(),
            new RNAndroidLocationEnablerPackage(),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
            new VectorIconsPackage(),
            new SvgPackage(),
            new MapsPackage(),
            new FBSDKPackage(mCallbackManager),
            new AndroidOpenSettingsPackage(),
            new RNFusedLocationPackage()
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
