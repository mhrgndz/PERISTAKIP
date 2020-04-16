function AnaSayfaCtrl($scope,$window,db)
{
    function Init()
    {
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
    }
   
    $scope.Yeni = function()
    {
        Init();
    }
}