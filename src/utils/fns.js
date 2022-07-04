import moment from "moment";

export const gd = (offset, type = "minutes") => moment().add(offset, type);
