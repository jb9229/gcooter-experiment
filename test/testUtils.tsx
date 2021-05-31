import { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

export const createTestElement = (child: ReactElement) => {
  return <RecoilRoot>{child}</RecoilRoot>;
};
