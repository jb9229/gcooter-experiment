import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { RecoilRoot } from 'recoil';
import { GcootersContainer } from '..';

describe('[Gcooters] unit test', () => {
  test('앱이 로딩되면 사용자 위치 반경 200m 내의 Gcooters를 보여줘야 한다', async () => {
    const { findByTestId } = render(
      <RecoilRoot>
        <GcootersContainer />
      </RecoilRoot>
    );

    await findByTestId('marker-0');
  });

  test('맵 마커를 선택하면, 마커의 색이 변경된다', async () => {
    const { findByTestId } = render(
      <RecoilRoot>
        <GcootersContainer />
      </RecoilRoot>
    );

    const markerWrap0 = await findByTestId('marker-wrap-0');

    const marker0 = await findByTestId('marker-0');

    fireEvent.press(markerWrap0);

    const gcooterMarker0 = marker0.props.children;

    await waitFor(() =>
      expect(gcooterMarker0.props.backgroundColor).toEqual('#072c1a')
    );
  });
});
