function IsEmriTanimlaCtrl($scope,$window,db)
{
    let IsEmriListRow = null;

    function Init()
    {
        db.Connection(function(data){});

        $scope.Firma = "PERISTAKIP"
        $scope.IsEmriKodu = "";
        $scope.IsEmriAdi = "";

        $scope.IsEmriList = [];
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
                                    $('#IsEmriListele').modal("hide");
                                });
                        },
                        width: 50
                    }
                ],
            ],
            rowClick: function(args)
            {
                $scope.IsEmriListRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }, 
        });
    }
    function IsEmriInsert()
    {
        var InsertData = 
        [
            $scope.IsEmriKodu,
            $scope.IsEmriAdi
        ];
        db.ExecuteTag($scope.Firma,'IsEmriInsert',InsertData,function(InsertResult)
        {   
            if(typeof(InsertResult) != 'undefined')
            {
                alertify.alert("Kayıt İşlemi Başarıyla Gerçekleşti.");
                $scope.IsEmriAdi = "";
                $scope.IsEmriKodu = "";
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
            alertify.alert("İş Emri Başarıyla Silindi.");
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
    $scope.Yeni = function()
    {
        Init();
        InitIsEmriGrid();
    }
    $scope.IsEmriListRowClick = function(pIndex,pItem,pObj)
    {
        if ( IsEmriListRow ) { IsEmriListRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblIsEmriList").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IsEmriListRow = $row;

        $scope.IsEmriKodu = pItem.KODU
        $scope.IsEmriAdi = pItem.ADI
    }
    $scope.BtnIsEmriListele =async function()
    {
        await IsEmriGetir('');
        $('#IsEmriListele').modal("show");
    }
    $scope.BtnKaydet = async function()
    {
        if($scope.IsEmriKodu != '' && $scope.IsEmriAdi != '')
        {
            await IsEmriGetir($scope.IsEmriKodu);

            if($scope.IsEmriList.length == 0)
            {
                IsEmriInsert();
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
}