import logoImg from '../../assets/logo.svg'
import { Container, Content } from "./style";

export function Header() {
  return (
    <Container>
      <Content>
      <img src={logoImg} alt='videoflix' />
      <button type='button'>
        Entrar
      </button>
      </Content>
    </Container>
  )
}
