function IsEmriTanimlaCtrl($scope,$window,db)
{
    let IsEmriListRow = null;
    let GemiListRow = null;

    function Init()
    {
        $scope.Firma = "PERISTAKIP"
        $scope.IsEmriKodu = "";
        $scope.IsEmriAdi = "";
        $scope.GemiKodu = "";
        $scope.GemiAdi = "";
        $scope.Tip = "0";
        $scope.TlpYevmiye = 0;
        $scope.OnyYevmiye = 0;
        $scope.YevmiyeDisabled = true

        $scope.IsEmriList = [];
        $scope.GemiList = [];
    }
    function InitIsEmriGrid()
    {    
        $("#TblIsEmriList").jsGrid
        ({
            
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IsEmriList,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                [
                    { 
                        itemTemplate: function(_, item) 
                        {
                            return $("<button type='submit' class='btn btn-primary btn-block btn-sm'></button>").text("Seç")
                                .on("click", function() 
                                {
                                    $('#MdlIsEmriListele').modal("hide");
                                });
                        },
                        width: 75
                    }
                ],
                {
                    name: "KODU",
                    title: "İŞ EMRİ KODU",
                    type: "number",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "ADI",
                    title: "İŞ EMRİ ADI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "ISTIP",
                    title: "İŞ EMRİ TİPİ",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "GEMIKODU",
                    title: "GEMİ KODU",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "GEMIADI",
                    title: "GEMİ ADI",
                    align: "center",
                    width: 200
                },
                {
                    name: "TLPYEVMIYE",
                    title: "TALEP YEVMIYE",
                    align: "center",
                    width: 100
                },
                {
                    name: "ONYYEVMIYE",
                    title: "ONAY YEVMIYE",
                    align: "center",
                    width: 100
                },
            ],
            rowClick: function(args)
            {
                $scope.IsEmriListRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }, 
        });
    }
    function InitGemiGrid()
    {    
        $("#TblGemiList").jsGrid
        ({
            
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.GemiList,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "KODU",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "ADI",
                    type: "text",
                    align: "center",
                    width: 300
                },
                [
                    { 
                        itemTemplate: function(_, item) 
                        {
                            return $("<button type='submit' class='btn btn-primary btn-block btn-sm'></button>").text("Seç")
                                .on("click", function() 
                                {
                                    $('#MdlGemiListele').modal("hide");
                                });
                        },
                        width: 50
                    }
                ],
            ],
            rowClick: function(args)
            {
                $scope.GemiListRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }, 
        });
    }
    function IsEmriInsert()
    {
        var InsertData = 
        [
            $scope.IsEmriKodu,
            $scope.IsEmriAdi,
            $scope.GemiKodu,
            $scope.Tip,
            $scope.TlpYevmiye,
            $scope.OnyYevmiye
        ];
        db.ExecuteTag($scope.Firma,'IsEmriInsert',InsertData,function(InsertResult)
        {   
            if(typeof(InsertResult) != 'undefined')
            {
                alertify.alert("Kayıt İşlemi Başarıyla Gerçekleşti.");
                $scope.Yeni();
            }
            else
            {
                alertify.alert("Kayıt İşlemi Gerçekleştirilemedi.");
            }
        });
    }
    function IsEmriDelete()
    {
        db.ExecuteTag($scope.Firma,'IsEmriDelete',[$scope.IsEmriKodu],async function(InsertResult)
        {   
            $scope.IsEmriKodu = "";
            $scope.IsEmriAdi = "";
            $scope.GemiKodu = "";
            $scope.GemiAdi = "";
            $scope.Tip = "0";
            alertify.alert("İş Emri Başarıyla Silindi.");
        });
    }
    function IsEmriUpdate()
    {
        var TmpQuery = 
        {
            query : "UPDATE ISEMRI SET TLPYEVMIYE = @TLPYEVMIYE,ONYYEVMIYE = @ONYYEVMIYE WHERE KODU = @KODU " ,
            param : ['TLPYEVMIYE','ONYYEVMIYE','KODU'],
            type : ['int','int','string|25'],
            value:  [$scope.TlpYevmiye,$scope.OnyYevmiye,$scope.IsEmriKodu]
        }

        db.ExecuteQuery(TmpQuery,async function(UpdateResult)
        {   
            await IsEmriGetir($scope.IsEmriKodu);
            alertify.alert("İş Emri Başarıyla Güncellendi.");
        });
    }
    async function IsEmriGetir(pKod)
    {
        await db.GetPromiseTag($scope.Firma,'IsEmriGetir',[pKod],function(Data)
        {
            $scope.IsEmriList = Data;
            $("#TblIsEmriList").jsGrid({data : $scope.IsEmriList}); 
        });
    }
    async function GemiGetir(pKod)
    {
        await db.GetPromiseTag($scope.Firma,'GemiGetir',[pKod],function(Data)
        {
            $scope.GemiList = Data;
            $("#TblGemiList").jsGrid({data : $scope.GemiList}); 
        });
    }
    $scope.Yeni = function()
    {
        Init();
        InitIsEmriGrid();
        InitGemiGrid();
    }
    $scope.IsEmriListRowClick = function(pIndex,pItem,pObj)
    {
        if ( IsEmriListRow ) { IsEmriListRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblIsEmriList").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IsEmriListRow = $row;
    
        if(pItem.TIP == "3")
        {
            $scope.YevmiyeDisabled = false
        }
        else
        {
            $scope.YevmiyeDisabled = true
        }

        $scope.IsEmriKodu = pItem.KODU
        $scope.IsEmriAdi = pItem.ADI
        $scope.GemiKodu = pItem.GEMIKODU
        $scope.GemiAdi = pItem.GEMIADI
        $scope.TlpYevmiye = pItem.TLPYEVMIYE
        $scope.OnyYevmiye = pItem.ONYYEVMIYE
        $scope.Tip = pItem.TIP.toString()
    }
    $scope.GemiListRowClick = function(pIndex,pItem,pObj)
    {
        if ( GemiListRow ) { GemiListRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblIsEmriList").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        GemiListRow = $row;

        $scope.GemiKodu = pItem.KODU
        $scope.GemiAdi = pItem.ADI
    }
    $scope.YevmiyeChange = function()
    {
        if($scope.Tip == "3")
        {
            $scope.YevmiyeDisabled = false
        }
        else
        {
            $scope.YevmiyeDisabled = true
        }
    }
    $scope.BtnIsEmriListele =async function()
    {
        await IsEmriGetir('');
        $('#MdlIsEmriListele').modal("show");
    }
    $scope.BtnIsEmriDelete = function()
    {
        if($scope.IsEmriKodu != '')
        {
            IsEmriDelete();
        }
        else
        {
            alertify.alert("Silinecek İş Emri Bulunamadı.");
        }
    }
    $scope.BtnGemiListele =async function()
    {
        await GemiGetir('');
        $('#MdlGemiListele').modal("show");
    }
    $scope.BtnKaydet = async function()
    {
        if($scope.IsEmriKodu != '' && $scope.IsEmriAdi != '' && $scope.GemiKodu != '')
        {
            await IsEmriGetir($scope.IsEmriKodu);
            await GemiGetir($scope.GemiKodu);

            if($scope.IsEmriList.length == 0)
            {
                if($scope.GemiList.length > 0)
                {
                    IsEmriInsert();
                }
                else
                {
                    alertify.alert("Girmiş Olduğunuz Gemi Kodundan Kayıt Bulunmamakta Lütfen Gemi Tanımlayınız.");
                }
            }
            else
            {
                alertify.alert("Girmiş Olduğunuz İş Emri Kodunda Kayıt Bulunmakta.");
            }
        }
        else
        {
            alertify.alert("Lütfen Boş Alanları Doldurunuz.");
        }
    }
    $scope.BtnGuncelle = async function()
    {
        if($scope.IsEmriKodu != '')
        {
            IsEmriUpdate();
        }
        else
        {
            alertify.alert("Güncellenecek İş Emri Bulunamadı.");
        }
    }
}