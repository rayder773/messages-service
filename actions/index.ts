import { MessageServiceAPI, MessageServiceArgs } from "../types";
import createMessage from "./create_message";

const useMessageService = ({
  db,
  logger,
  ws,
}: MessageServiceArgs): MessageServiceAPI => {
  return {
    createMessage: createMessage({ db, logger, ws }),
  };
};

export default useMessageService;
