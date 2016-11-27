from datetime import datetime
from Entity.Entity import *


class UserAccounts(db.Model):
    __tablename__ = 'UserAccounts'

    def __init__(self
                 , UserName
                 , Password
                 , FBuserID
                 , FBAccessToken
                 , CreateDate=datetime.now()
                 , ModifiedDate=datetime.now()
                 ):
        self.UserName = UserName
        self.Password = self.psw_to_md5(Password)
        self.FBuserID = FBuserID
        self.FBAccessToken = FBAccessToken
        self.CreateDate = CreateDate
        self.ModifiedDate = ModifiedDate

    def update(self):
        db.session.commit()

    @classmethod
    def psw_to_md5(self, str_psw):
        import hashlib
        if str_psw == None:
            return None
        else:
            m = hashlib.md5(str_psw.encode(encoding='utf-8'))
            return m.hexdigest()
