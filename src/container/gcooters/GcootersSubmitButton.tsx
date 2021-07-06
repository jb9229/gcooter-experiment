import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedMarkerState } from './store';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  position: absolute;
  bottom: 10px;
  background-color: darkgray;
  border-radius: 4px;
`;

const StyledButton = styled.Button``;

const GcootersSubmitButton: React.FC = () => {
  const selectedMarker = useRecoilValue(selectedMarkerState);

  console.log('>>> re-render: [GcooterSubmitButton] Com.');

  return (
    <Wrapper>
      <StyledButton
        title={selectedMarker.id ? '운행시작' : '스쿠터 먼저 선택'}
        disabled={!selectedMarker.id}
        onPress={() =>
          alert(`submit action: ${JSON.stringify(selectedMarker)}`)
        }
      />
    </Wrapper>
  );
};

export default GcootersSubmitButton;
