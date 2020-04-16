function IscilikOzetRapor($scope,$window,db)
{
    function Init()
    {
        $scope.Firma = "PERISTAKIP"
        $scope.PersonelKodu = "";
        $scope.GemiKodu = "0";
        $scope.SozlesmeliToplam = "0";
        $scope.YevmiyeToplam = "0";
        $scope.Toplam = "0";

        $scope.GemiList = [];
        $scope.RaporList = [];
    }
    async function GemiGetir(pKod)
    {
        await db.GetPromiseTag($scope.Firma,'GemiGetir',[''],function(Data)
        {
            $scope.GemiList = Data;
        });
    }
    function RaporGetir()
    {
        var TmpQuery = 
        {
            query : "SELECT ISNULL(COUNT(KODU),0) AS TOPLAM, " +
                    "TIP AS TIP, " +
                    "CASE WHEN TIP = 1 THEN 'SÖZLEŞMELİ' WHEN TIP = 2 THEN 'İLAVE' WHEN TIP = 3 THEN 'YEVMİYE' END AS TIPADI " +
                    "FROM ISEMRIHAREKET " +
                    "WHERE GEMIKODU = @GEMIKODU AND TIP <> 2 GROUP BY TIP ORDER BY TIP" ,
            param : ['GEMIKODU'],
            type : ['string|25'],
            value:  [$scope.GemiKodu]
        }

        db.GetDataQuery(TmpQuery,async function(Data)
        {   
            $scope.RaporList = Data
            if($scope.RaporList.length > 0)
            {
                $scope.SozlesmeliToplam = $scope.RaporList[0].TOPLAM
                $scope.YevmiyeToplam = $scope.RaporList[1].TOPLAM
                $scope.Toplam = $scope.SozlesmeliToplam + $scope.YevmiyeToplam;
            }
            else
            {
                alertify.alert("Gösterilecek Veri Bulanamadı.");
            }
        });
    }
    $scope.Yeni = async function()
    {
        Init();

        await GemiGetir();
    }
    $scope.BtnCalistir = async function()
    {
        $scope.SozlesmeliToplam = "0";
        $scope.YevmiyeToplam = "0";
        $scope.Toplam = "0";

        if($scope.GemiKodu != '0')
        {
            await RaporGetir();
        }
        else
        {
            alertify.alert("Lütfen Gemi Seçimi Yapınız.");
        }
    }
}