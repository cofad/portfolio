import * as typeWrite from "./type-write.js";

const typeWriteable = typeWrite.getTypeWriteableElement();
const typeWritten = typeWrite.getTypeWrittenElement();

typeWrite.typeWriteElement(typeWritten, typeWriteable);
