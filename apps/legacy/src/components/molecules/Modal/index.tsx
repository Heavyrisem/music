import { Body } from './components/Body';
import { CloseButton } from './components/CloseButton';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ModalComponent } from './components/Modal';

export const Modal = Object.assign(ModalComponent, { CloseButton, Header, Body, Footer, Content });
