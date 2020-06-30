import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

interface NotificationList {
  visible: boolean;
}

interface Notification {
  unread: boolean;
}

interface Badge {
  hasUnread: boolean;
}

export const Container = styled.div`
  position: relative;
  margin-left: 50px;
`;

export const Badge = styled.button<Badge>`
  background: none;
  border: 0;
  position: relative;

  ${(props) =>
    props.hasUnread &&
    css`
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 8px;
        background: #ff9900;
        content: '';
        border-radius: 50%;
      }
    `}
`;

export const NotificationList = styled.div<NotificationList>`
  position: absolute;
  width: 560px;
  left: calc(50% - 280px);
  top: calc(100% + 30px);
  background: #000;
  border-radius: 4px;
  padding: 15px 5px;
  display: ${(props) => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.7);
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 560px;
  padding: 5px 15px;
`;

export const Notification = styled.div<Notification>`
  color: #fff;
  margin-top: 15px;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  p {
    font-size: 18px;
    line-height: 18px;
  }

  time {
    display: block;
    font-size: 12px;
    opacity: 0.6;
    margin-bottom: 5px;
  }

  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#ff9000')};
    padding: 0 5px;
    margin: 0 5px;
  }

  ${(props) =>
    props.unread &&
    css`
      &::after {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #ff9000;
        border-radius: 50%;
        margin-left: 10px;
      }
    `}
`;

export const NotificationHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #ff9000;

  h4 {
    padding: 10px 15px 15px;
    font-size: 20px;
    color: #fff;
  }
`;
