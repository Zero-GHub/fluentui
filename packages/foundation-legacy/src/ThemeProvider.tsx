import * as React from 'react';
import { getThemedContext, ISchemeNames, ITheme } from '@fluentui/style-utilities';
import { Customizer, ICustomizerProps } from '@fluentui/utilities';

export interface IThemeProviderProps {
  scheme?: ISchemeNames;
  theme?: ITheme;
}

/**
 * Theme provider is a simplified version of Customizer that activates the appropriate theme data
 * for a given scheme name.
 *
 * @param providers - Injected providers for accessing theme data and providing it via a Customizer component.
 */
export const ThemeProvider: React.FunctionComponent<IThemeProviderProps> = (props: IThemeProviderProps) => {
  const { scheme, theme, ...rest } = props;

  // TODO: consider merging implementation with theme-proto, which only stores a reference / scheme name to theme
  //   in context and uses quick global store accessor to trigger change by passing in theme object as child and
  //   triggering re-render. (perf benefits need verification)
  const contextTransform: ICustomizerProps['contextTransform'] = context => {
    return getThemedContext(context, scheme, theme);
  };

  // eslint-disable-next-line react/jsx-no-bind
  return <Customizer {...rest} contextTransform={contextTransform} />;
};
