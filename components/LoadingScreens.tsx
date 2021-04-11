import styled from 'styled-components'

const LoadingScreenContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }: any) => theme.color.background.main};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const LoadingScreenObject = styled.span`
  width: 6px;
  height: 40px;
  background: linear-gradient(0deg ,#E93BCC, #3BE9E3);
  margin: 0 3px;
  border-radius: 10px;
  animation: loading 0.8s infinite;
  :nth-child(2) {
    animation-delay: 0.7s;
  }
  :nth-child(3) {
    animation-delay: 0.3s;
  }
  :nth-child(4) {
    animation-delay: 0.1s;
  }
  :nth-child(5) {
    animation-delay: 0.2s;
  }
  :nth-child(6) {
    animation-delay: 0.5s;
  }
  :nth-child(7) {
    animation-delay: 0.4s;
  }
  :nth-child(8) {
    animation-delay: 0.6s;
  }
  @keyframes loading {
    0% {
      height: 0;
    }
    50% {
      height: 40px;
    }
    100% {
      height: 0;
    }
  }
`

export const LoadingScreen = () => (
  <LoadingScreenContainer>
    <LoadingScreenObject />
    <LoadingScreenObject />
    <LoadingScreenObject />
    <LoadingScreenObject />
    <LoadingScreenObject />
    <LoadingScreenObject />
    <LoadingScreenObject />
    <LoadingScreenObject />
  </LoadingScreenContainer>
)

const SmallLoadContainer = styled.div`
  width: 130px;
  height: 30px;
  background-color: ${({ theme }: any) => theme.color.background.paper};
  position: absolute;
  right: 0;
  bottom: 0px;
  margin-right: 2%;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 10px 1px ${({ theme }: any) => theme.color.background.main};
  @media (max-width: 600px) {
    background-color: ${({ theme }: any) => theme.color.background.light};
  }
`
const SmallLoadBar = styled.span`
  width: 100px;
  height: 2px;
  position: relative;
  overflow: hidden;
  ::before {
    content: "";
    width: 60px;
    height: 2px;
    background-color: ${({ theme }: any) => theme.color.primary.main};
    position: absolute;
    left: -34px;
    animation: bar 1s infinite ease;
  }
  @keyframes bar {
    50% {
      left: 60px;
      background-color: ${({ theme }: any) => theme.color.secondary.main};
    }
  }
`

export const SmallLoad = () => (
  <SmallLoadContainer>
    <SmallLoadBar />
  </SmallLoadContainer>
)