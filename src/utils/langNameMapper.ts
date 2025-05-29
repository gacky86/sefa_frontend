const languageNames: { [key: string]: string } = {
  '英語': 'English',
  'ドイツ語': 'Deutsch',
  'フランス語': 'français',
  'ポルトガル語': 'português',
  'スペイン語': 'español',
  'オランダ語': 'Nederlands',
  'イタリア語': 'italiano',
};

export function getLanguageName(japaneseName: string): string {
  return languageNames[japaneseName] || japaneseName;
}
