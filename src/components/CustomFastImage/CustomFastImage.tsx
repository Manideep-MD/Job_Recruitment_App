// components/CustomFastImage/CustomFastImage.tsx
import React, {useState} from 'react';
import {
  ActivityIndicator,
  ImageStyle,
  StyleProp,
  View,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useCustomTheme} from '../../theme/ThemeContext';

const CustomFastImage: React.FC = ({
  source,
  style,
  resizeMode = FastImage.resizeMode.cover,
  ...rest
}: any) => {
  const {theme} = useCustomTheme();
  const [loading, setLoading] = useState(true);
  const isUri = source && source.uri;

  return (
    <View style={[style, styles.wrapper]}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color={theme.darkBlue} />
        </View>
      )}
      <FastImage
        source={
          isUri
            ? {uri: source.uri, priority: FastImage.priority.normal}
            : source
        }
        style={style}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
        {...rest}
      />
    </View>
  );
};

export default CustomFastImage;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
});
