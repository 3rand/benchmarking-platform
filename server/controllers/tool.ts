import BaseCtrl from './base';
import * as jwt from 'jsonwebtoken';
import Tool from '../models/tool';

class ToolCtrl extends BaseCtrl {
    model = Tool;
}

export default ToolCtrl;
