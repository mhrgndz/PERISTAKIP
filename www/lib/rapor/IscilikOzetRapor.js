function IscilikOzetRapor($scope,$window,db)
{
    let YevmiyeListRow = null;

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
        $scope.YevmiyeList = [];
        $scope.SozlesmeliList = [];
        $scope.YevmiyeDetayList = [];
        $scope.SozlesmeliDetayList = [];
    }
    function InitYevmiyeGrid()
    {    
        $("#TblYevmiyeGrid").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.YevmiyeList,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "TARIH",
                    title : "AY",
                    type: "number",
                    align: "center",
                    width: 50
                },
                {
                    name: "KODU",
                    title : "KODU",
                    type: "number",
                    align: "center",
                    width: 150
                },
                {
                    name: "ISEMRIADI",
                    title : "İŞ EMRİ ADI",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "YEVMIYE",
                    title : "YEVMIYE",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "TALEPYEVMIYE",
                    title : "TALEP YEVMIYE",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "ONAYLANANYEVMIYE",
                    title : "ONAY YEVMIYE",
                    type: "text",
                    align: "center",
                    width: 100
                },
                [
                    { 
                        itemTemplate: function(_, item) 
                        {
                            return $("<button type='submit' class='btn btn-primary btn-block btn-sm'></button>").text("Detay")
                                .on("click", function() 
                                {
                                    $('#MdlYevmiyeDetay').modal("show");
                                });
                        },
                        width: 50
                    }
                ],
            ],
            rowClick: function(args)
            {
                $scope.YevmiyeListRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }, 
        });
    }
    function InitYevmiyeDetayGrid()
    {    
        $("#TblYevmiyeDetay").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.YevmiyeList,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "PERKODU",
                    title : "PERSONEL KODU",
                    type: "number",
                    align: "center",
                    width: 50
                },
                {
                    name: "PERSONELADI",
                    title : "PERSONEL ADI",
                    type: "number",
                    align: "center",
                    width: 150
                },
                {
                    name: "TARIH",
                    title : "TARIH",
                    type: "number",
                    align: "center",
                    width: 80
                },
            ],
            rowClick: function(args)
            {
                $scope.YevmiyeListRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }, 
        });
    }
    function InitSozlesmeliGrid()
    {    
        $("#TblSozlesmeliGrid").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.YevmiyeList,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "KODU",
                    title : "KODU",
                    type: "number",
                    align: "center",
                    width: 150
                },
                {
                    name: "ISEMRIADI",
                    title : "İŞ EMRİ ADI",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "SOZLESMELI",
                    title : "SÖZLEŞMELİ",
                    type: "text",
                    align: "center",
                    width: 100
                },
                [
                    { 
                        itemTemplate: function(_, item) 
                        {
                            return $("<button type='submit' class='btn btn-primary btn-block btn-sm'></button>").text("Detay")
                                .on("click", function() 
                                {
                                    $('#MdlSozlemeliDetay').modal("show");
                                });
                        },
                        width: 50
                    }
                ],
            ],
            rowClick: function(args)
            {
                $scope.SozlemeliListRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }, 
        });
    }
    function InitSozlesmeliDetayGrid()
    {    
        $("#TblSozlesmeliDetay").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SozlesmeliDetayList,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "PERKODU",
                    title : "PERSONEL KODU",
                    type: "number",
                    align: "center",
                    width: 50
                },
                {
                    name: "PERSONELADI",
                    title : "PERSONEL ADI",
                    type: "number",
                    align: "center",
                    width: 150
                },
                {
                    name: "TARIH",
                    title : "TARIH",
                    type: "number",
                    align: "center",
                    width: 80
                },
            ],
            rowClick: function(args)
            {
                $scope.SozlemeliListRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }, 
        });
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
                $scope.SozlesmeliToplam = db.SumColumn($scope.RaporList,"TOPLAM","TIP = 1")
                $scope.YevmiyeToplam = db.SumColumn($scope.RaporList,"TOPLAM","TIP = 3")
                $scope.Toplam = $scope.SozlesmeliToplam + $scope.YevmiyeToplam;

                //YEVMİYE
                var TmpQuery = 
                {
                    query : "SELECT " +
                            "KODU AS KODU, " +
                            "(SELECT ADI FROM ISEMRI WHERE KODU = ISEMRIHAREKET.KODU) AS ISEMRIADI, " +
                            "MONTH(BASTARIH) AS TARIH, " +
                            "COUNT(KODU) AS YEVMIYE, " +
                            "(SELECT TLPYEVMIYE FROM ISEMRI WHERE KODU = ISEMRIHAREKET.KODU) AS TALEPYEVMIYE, " +
                            "(SELECT ONYYEVMIYE FROM ISEMRI WHERE KODU = ISEMRIHAREKET.KODU) AS ONAYLANANYEVMIYE " +
                            "FROM ISEMRIHAREKET WHERE TIP = 3 AND GEMIKODU = @GEMIKODU GROUP BY KODU,MONTH(BASTARIH) " ,
                    param : ['GEMIKODU'],
                    type : ['string|25'],
                    value:  [$scope.GemiKodu]
                }
                db.GetDataQuery(TmpQuery,async function(Data)
                { 
                    $scope.YevmiyeList = Data;
                    $("#TblYevmiyeGrid").jsGrid({data : $scope.YevmiyeList}); 
                });

                //SÖZLEŞMELİ
                var TmpQuery = 
                {
                    query : "SELECT " +
                            "KODU AS KODU, " +
                            "(SELECT ADI FROM ISEMRI WHERE KODU = ISEMRIHAREKET.KODU) AS ISEMRIADI, " +
                            "COUNT(KODU) AS SOZLESMELI " +
                            "FROM ISEMRIHAREKET WHERE TIP = 1 AND GEMIKODU = @GEMIKODU GROUP BY KODU " ,
                    param : ['GEMIKODU'],
                    type : ['string|25'],
                    value:  [$scope.GemiKodu]
                }
                db.GetDataQuery(TmpQuery,async function(Data)
                { 
                    $scope.SozlesmeliList = Data;
                    $("#TblSozlesmeliGrid").jsGrid({data : $scope.SozlesmeliList}); 
                });
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
        InitYevmiyeGrid();
        InitYevmiyeDetayGrid();
        InitSozlesmeliGrid();
        InitSozlesmeliDetayGrid();

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
    $scope.BtnYazdir = function()
    {
        var printContents = document.getElementById("A4").innerHTML;

        document.body.innerHTML = printContents;
        $window.print();
        $window.location.reload();
    }
    $scope.YevmiyeListRowClick = function(pIndex,pItem,pObj)
    {
        if ( YevmiyeListRow ) { YevmiyeListRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblIsEmriList").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        YevmiyeListRow = $row;

        var TmpQuery = 
        {
            query : "SELECT " +
                    "KODU, " +
                    "PERKODU, " +
                    "CONVERT(VARCHAR,BASTARIH,102) AS TARIH, " +
                    "(SELECT ADI FROM PERSONEL WHERE KODU = PERKODU) AS PERSONELADI " +
                    "FROM ISEMRIHAREKET WHERE TIP = 3 AND KODU = @KODU AND MONTH(BASTARIH) = @TARIH ORDER BY TARIH DESC" ,
            param : ['KODU','TARIH'],
            type : ['string|25','int'],
            value:  [pItem.KODU,pItem.TARIH]
        }
        db.GetDataQuery(TmpQuery,async function(Data)
        { 
            $scope.YevmiyeDetayList = Data;
            $("#TblYevmiyeDetay").jsGrid({data : $scope.YevmiyeDetayList}); 
        });
    }
    $scope.SozlemeliListRowClick = function(pIndex,pItem,pObj)
    {
        if ( YevmiyeListRow ) { YevmiyeListRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblIsEmriList").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        YevmiyeListRow = $row;

        var TmpQuery = 
        {
            query : "SELECT " +
                    "KODU, " +
                    "PERKODU, " +
                    "CONVERT(VARCHAR,BASTARIH,102) AS TARIH, " +
                    "(SELECT ADI FROM PERSONEL WHERE KODU = PERKODU) AS PERSONELADI " +
                    "FROM ISEMRIHAREKET WHERE TIP = 1 AND KODU = @KODU ORDER BY TARIH DESC" ,
            param : ['KODU'],
            type : ['string|25'],
            value:  [pItem.KODU]
        }
        db.GetDataQuery(TmpQuery,async function(Data)
        { 
            $scope.SozlesmeliDetayList = Data;
            $("#TblSozlesmeliDetay").jsGrid({data : $scope.SozlesmeliDetayList}); 
        });
    }
}