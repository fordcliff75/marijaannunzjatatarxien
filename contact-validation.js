(function(root){
  const limits=Object.freeze({count:5,each:5*1000*1000,total:8*1000*1000});
  function inspectFiles(files){
    if(files.length>limits.count)return 'Please select no more than 5 photographs.';
    if(files.reduce((sum,f)=>sum+f.size,0)>limits.total)return 'Your photographs exceed 8 MB in total. Please choose fewer or smaller files.';
    for(const f of files){
      if(!f.size)return 'An empty file was selected. Please choose a photograph.';
      if(f.size>limits.each)return 'A photograph exceeds 5 MB. Please resize it before uploading.';
      if(!/\.(jpe?g|png|webp)$/i.test(f.name)||!['image/jpeg','image/png','image/webp'].includes(f.type))return 'Please use JPEG, PNG or WebP photographs only.';
    }return '';
  }
  function hasSignature(bytes,type){
    if(type==='image/jpeg')return bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
    if(type==='image/png')return [137,80,78,71,13,10,26,10].every((n,i)=>bytes[i]===n);
    if(type==='image/webp')return String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP';return false;
  }
  const api={limits,inspectFiles,hasSignature};if(typeof module==='object'&&module.exports)module.exports=api;else root.tarxienContactValidation=api;
})(typeof window==='undefined'?{}:window);
