$('#my-final-table').dynatable({
    dataset: {
        ajax: true,
        ajaxUrl: "gear.json",
        ajaxOnLoad: true,
        records: []
    }
});