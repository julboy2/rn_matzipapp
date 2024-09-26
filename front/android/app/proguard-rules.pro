# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:


#TODO : 배포시 .env 에 있는 config 가 안먹을 때도 있어서 아래와 같이 넣어준다.
-keep class com.matzipapp.BuildConfig { *; }