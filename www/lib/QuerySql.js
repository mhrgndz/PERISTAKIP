var QuerySql = 
{
    PersonelGetir : 
    {
        query : "SELECT KODU AS KODU,ADI AS ADI FROM PERSONEL WHERE ((KODU = @KODU) OR (@KODU = '')) ORDER BY KODU",
        param : ['KODU'],
        type : ['string|25']
    },
    PersonelInsert :
    {
        query : "INSERT INTO PERSONEL " +
                "([KODU] " +
                ",[ADI]) " +
                "VALUES " +
                "(@KODU                 --<KODU, nvarchar(25),> \n" +
                ",@ADI)                  --<ADI, nvarchar(50),> " ,
        param : ['KODU','ADI'],
        type : ['string|25','string|50']
    },
    PersonelDelete :
    {
        query : "DELETE FROM PERSONEL WHERE KODU = @KODU" ,
        param : ['KODU'],
        type : ['string|25']
    },
    IsEmriGetir : 
    {
        query : "SELECT KODU AS KODU,ADI AS ADI FROM ISEMRI WHERE ((KODU = @KODU) OR (@KODU = '')) ORDER BY KODU",
        param : ['KODU'],
        type : ['string|25']
    },
    IsEmriInsert :
    {
        query : "INSERT INTO ISEMRI " +
                "([KODU] " +
                ",[ADI]) " +
                "VALUES " +
                "(@KODU                 --<KODU, nvarchar(25),> \n" +
                ",@ADI)                  --<ADI, nvarchar(50),> " ,
        param : ['KODU','ADI'],
        type : ['string|25','string|50']
    },
    IsEmriDelete :
    {
        query : "DELETE FROM ISEMRI WHERE KODU = @KODU" ,
        param : ['KODU'],
        type : ['string|25']
    }
};


