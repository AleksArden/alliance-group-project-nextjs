import { MessageType } from 'types/otherType';

const Message = ({ name, phoneNumber, email, text }: MessageType) => (
  <ul>
    <li>
      <p>
        Name: <strong>{name}</strong>
      </p>
    </li>

    <li>
      <p>
        Phone: <strong>{phoneNumber}</strong>
      </p>
    </li>

    <li>
      <p>
        Emaile: <strong>{email}</strong>
      </p>
    </li>

    <li>
      <p>
        Text: <strong>{text}</strong>
      </p>
    </li>
  </ul>
);
export default Message;
