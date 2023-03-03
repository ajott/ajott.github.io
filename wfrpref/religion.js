function miracleFilter(input) {
    $('.btn-selected').removeClass('btn-selected')
    $('#cultDesc').html("");

    try {
        $(".miracleGrid").isotope('destroy')
    } catch (error) {
        
    };

    $('.grid-item').remove();

    let htmlString = "";

    let cult = input;

    $('#cultBtn'+cult).addClass('btn-selected');
    

    for (let i = 0; i < miracle.length; i++) {
        let isBlessing = (blessByCult[cult].includes(miracle[i]["name"]))
        if (miracle[i]["god"] == cult || isBlessing) {


            // Cult Description
            $('.cultImg').attr('src',"./img/"+cult+" Shrine.webp")

            $('.godDesc').html(cults[cult]["title"]);
            $('.cultSOP').html(cults[cult]["SOP"]);
            $('.cultHOC').html(cults[cult]["HOC"]);
            $('.cultOrders').html(cults[cult]["Orders"]);
            $('.cultFestivals').html(cults[cult]["Festivals"]);
            $('.cultBooks').html(cults[cult]["Books"]);
            $('.cultSymbols').html(cults[cult]["Symbols"]);
            $('.cultGodDesc').html(cults[cult]["GodDesc"]);
            $('.cultWorshippers').html(cults[cult]["Worshippers"]);
            $('.cultSites').html(cults[cult]["Sites"]);
            $('.cultPenances').html(cults[cult]["Penances"]);
            $('.cultStrictures').html(cults[cult]["Strictures"]);
            $('.cultDescDetail').show();


            var $div = $('#defaultMiracleCard');

            var $klon = $div.clone().prop('id', 'miracle' + i);


            if ($("#miracle" + (i - 1)).length === 0) {
                $div.after($klon.show().removeClass("w3-hide"));
            } else {
                $("#miracle" + (i - 1)).after($klon.show().removeClass("w3-hide"));
            }


            if (isBlessing) {
                $("#miracle" + i + " .miracleName").html("Blessing of " + miracle[i]["name"])
                $("#miracle" + i + " .miracleTier").html(0)
                $("#miracle" + i).addClass("blessCard")
            } else {
                $("#miracle" + i + " .miracleName").html(miracle[i]["name"])
                $("#miracle" + i + " .miracleTier").html(1)
            }

            if (isBlessing){
                $("#miracle" + i + " .miracleGod").text(cult)
            } else {
                $("#miracle" + i + " .miracleGod").text(miracle[i]["god"])
            }

            $("#miracle" + i + " .miracleRange").html(miracle[i]["range"])
            $("#miracle" + i + " .miracleTarget").html(miracle[i]["target"])
            $("#miracle" + i + " .miracleDuration").html(miracle[i]["duration"])

            if (miracle[i]["desc"] != undefined) {
                if (typeof (miracle[i]["desc"]) == "object") {
                    for (let j = 0; j < miracle[i]["desc"].length; j++) {
                        htmlString += "<p>" + miracle[i]["desc"][j] + "</p>";
                    }
                } else {
                    htmlString = "<p>" + miracle[i]["desc"] + "</p>"
                }
            }
            
            $("#miracle" + i + " .miracleDescription").html(htmlString)
            $("#miracle" + i).addClass("grid-item")

            htmlString = "";
        }

        initializeModals();

        setTimeout(() => {
            $('.miracleGrid').isotope({
                itemSelector: '.grid-item',
                masonry: {
                    columnWidth: 25
                },
                getSortData: {
                    name: '.miracleName',
                    tier: '.miracleTier'
                }
            });
            $('.miracleGrid').isotope({
                sortBy: ['tier','name']
            })
            $('miracleGrid').isotope('updateSortData').isotope();
        },150)


    }



}


var cults = {
    "Manann": {
        "title": "Manann, God of the Sea",
        "SOP": "Marienburg, the Wasteland",
        "HOC": "Matriarch of the Sea",
        "Orders": "Order of the Albatross, Order of the Mariner",
        "Festivals": "Spring Equinox, Autumn Equinox",
        "Books": "The 1000 Shanties, Tales of the Albatross, Liber Manaan",
        "Symbols": "Five-tined Crown, Waves, Anchors",
        "GodDesc": "<p>Volatile Manann, the son of Taal and Rhya, is the capricious King of the Sea, Master of the Maelstroms, and Summoner of Storms. Known for his black moods and erratic temper, folk claim his cult is needed more than any other, for if ever there is a god that must be appeased, it’s Manaan. He’s depicted as an enormous, blackbearded man with seaweed in his hair and a great, five-pointed crown of black iron upon his troubled brow. He’s said to dwell at the bottom of the ocean, the rise and fall of his massive chest forming the waves and tides as the greatest monsters of the deep gather in his court.</p>",
        "Worshippers": "<p>Manann is worshipped along coasts throughout the Old World, wherever people make their living from the sea or live close enough for storms and floods to threaten their homes. Even those who know little of Manann will throw a coin or other small treasure into the water before beginning a sea voyage in the hope of a smooth crossing.</p><p> The cult has a significant number of orders, mostly monastic, tasked to guard isolated, sacred islands. The Order of the Albatross is largest, comprised of priests who maintain temples across the Old World and bless merchant or naval vessels with their presence. Often accompanying them, the Order of the Mariner is the military arm of Manann, the cult’s templar-marines, sworn protectors of Marienburg.</p><p> Manann’s clerics usually wear robes of dark greenish-blue or blue-grey, trimmed with a white wave-pattern.</p>",
        "Sites": "<p>Manann’s temples are found in all coastal towns and cities, and in most river ports where seagoing vessels berth. The high temple is in the great port-city of Marienburg: a huge, lavishly decorated complex open to the tides. The Matriarch of the Sea, head of the Order of the Albatross, is based there, a woman who ostensibly leads the entire cult of Manann, although in practice the sea-god’s clerics are as mercurial as their god, and as likely to be stubborn as to serve. The cult also maintains many monasteries and abbeys on small isolated islands, most dedicated to one of Manann’s many saints.</p> ",
        "Penances": "<p>Penances from Manann often involve hazardous, maritime pilgrimages, tests of sailing skills, or expeditions against the sea-god’s enemies, especially followers of the heretical cult of Stromfels, God of Pirates, Wreckers, and Sharks.</p>",
        "Strictures": "<li>No whistling or swearing when at sea or on holy ground.</li><li>Never harm an albatross.</li><li>First catch to Manann.</li><li>A silver and fish to every Manannite temple and shrine approached.</li><li>Hunt down the servants of Stromfels wherever they may hide.</li>"
    },
    "Morr": {
        "title": "Morr, God of Death",
        "SOP": "Luccini, Tilea",
        "HOC": "Custode del Portale",
        "Orders": "Order of the Shroud, Order of the Black Guard, Order of the Augurs",
        "Festivals": "Hexensnacht, Geheimisnacht",
        "Books": "The Book of Doorways, Libro Dei Morti, Thernodies of the Raven",
        "Symbols": "Portals, Ravens, Black Roses",
        "GodDesc": "<p>Urbane Morr, God of Death and King of the Underworld, is husband to Verena, brother to murderous Khaine, and father of Myrmidia and Shallya. He sends divine ravens to guide dead souls to the Portal, the pillared gateway between the mortal realms and the realm of the gods. He then leads each soul from there to its final resting place: either Morr’s Underworld, or the afterlife of another god. He is commonly portrayed as a tall, dark-haired man of aristocratic bearing, with a brooding, intense air.</p>",
        "Worshippers": "<p>Outside Ostermark, where Morr has special importance, few wish to attract the God of Death’s attention, so normally only the bereaved pray to him. However, those desperate or brave enough may pray for dreams of what the future may bring, though it is said he rarely divulges anything not associated with dying.</p><p>The Order of the Shroud dominates the cult, directly controlling all other orders and the Mourners’ Guild, those responsible for overseeing burials and burial grounds. Supporting them, the Black Guard are the cult’s largest templar order, tasked to guard temples and hunt down the Undead. The Order of Augurs may be small, but it guides the leadership with its foretellings, and organises the Order of Doomsayers: these wandering priests of Morr tour the land performing Doomings for all Human children on their tenth year. Bringing them all together, every decade a grand convocation of the priesthood of Morr is held at Luccini in Tilea, where the future for the cult is discussed around city-wide festivities.</p><p>All Morr’s clerics wear plain, black, hooded robes without adornment or trimming.</p>",
        "Sites": "<p>Temples of Morr are within Gardens of Morr: great graveyards wrapped with black roses that bloom all year, and are rarely used for anything other than funeral services. Most are plain structures of dark stone, distinguished by a broad doorway with a heavy lintel-stone &mdash; representing Morr’s Portal. The doors are always open, like the doors to the Kingdom of Death.  Inside, the temples are bare. Any necessary furniture and other equipment is kept in storage until it is needed for a funeral service. Shrines to Morr also take the form of a gateway, usually consisting of two plain pillars and a lintel. In some cases, one pillar is white marble and the other black basalt.</p>",
        "Penances": "<p>Morr’s penances typically involve hunting Necromancers and destroying Undead, or finding and restoring burial places and holy sites fallen to disuse and disrepair. He also occasionally requires servants of Khaine be stopped from fulfilling their dark deeds.</p>",
        "Strictures": "<li>Respect and protect the dead.</li><li>Hunt down Necromancers and the Undead wherever they may gather.</li><li>Pay heed to your dreams.</li><li>Never refuse to conduct a funeral service.</li><li>At no time be a party to raising the dead, unless allowed by Morr.</li>"
    },
    "Myrmidia": {
        "title": "Myrmidia, Goddess of Strategy",
        "SOP": "Magritta, Estalia",
        "HOC": "La Aguila Ultima",
        "Orders": "Order of the Eagle, Order of the Righteous Spear, Order of the Blazing Sun",
        "Festivals": "None in the Empire",
        "Books": "Bellona Myrmidia, Bellum Strategia, The Book of War",
        "Symbols": "Spear behind a shield, Eagles, Suns",
        "GodDesc": "<p>In the Empire, bronzed Myrmidia, daughter of Verena and Morr, sister of Shallya, is the Goddess of Strategy and Scientific Warfare. However, in the sun-drenched south, Myrmidia is much more than this: she acts as the patron deity of both the Estalian Kingdoms and the Tilean City States, and is fanatically worshipped in both realms. Because of this, her cult is the largest in the Old World, for all it has a limited presence in the Empire. She is commonly portrayed as a tall, muscular, young woman armed and equipped in archaic, southern stylings. She is known for her calm, honourable approach to all matters, and her clerics do what they can to emulate this.</p>",
        "Worshippers": "<p>Myrmidia grants generals the insight to win battles with minimal losses, and soldiers the skill-at-arms to defeat enemies quickly and without significant losses. Because of this, her cult is steadily growing among the armies and garrisons of the Empire, especially in the Reikland, Averland, and Wissenland. In the Empire, the cult has three orders of significance. The Order of the Eagle tends to the temples and their surrounding communities, and is led from Nuln by the ‘Eagle of the North’, the most powerful Myrmidian north of the Vaults. The templar Order of the Righteous Spear has a chapterhouse attached to each of these temples, each commanded by the local high priest. A second templar order, the Order of the Blazing Sun, is the oldest Myrmidian order in the Empire, and works independently of the Order of the Eagle.</p><p>Myrmidia’s clerics in the Empire normally wear blue cowls over white robes with red edging, with her symbol either sewn onto the left breast or worn as a cloak-clasp.</p>",
        "Sites": "<p>Most of Myrmidia’s holy sites are found in Estalia and Tilea, and are associated with the goddess’s campaigns across those realms when she manifested as a mortal over two-thousand years ago. In the Empire, the goddess has much less of a presence, with temples only in major towns and cities, and only a single monastic order cloistered in the Monastery of the Black Maiden in Wissenland. Temples to Myrmidia tend to follow the architectural styles of Tilea and Estalia, with domed roofs covering square or rectangular halls. Their exteriors are often carved with low reliefs showing battle scenes or tableaux of weapons and shields. Shrines may take the form of miniature temples, statues of the goddess, or free-standing sculptures of stacked weapons, shields, and armour. Myrmidia’s holy sites are also known for their scandalous depictions of the goddess and her saints, who are often presented wearing little more than scarves about their waists, which many Sigmarites find completely unacceptable.</p>",
        "Penances": "<p>Penances from Myrmidia are usually military in nature. A cultist may be ordered to defeat an enemy champion in single combat, or to train a group of peasants and lead them in the defence of their village. Protecting pilgrimage routes to sites of importance to Myrmidia are also not uncommon.</p>",
        "Strictures": " <li>Act with honour and dignity in all matters.</li> <li>Respect prisoners of war, and never kill an enemy who</li> <li>rrenders.</li> <li>Show no mercy to the unrepentant enemies of Humanity.</li> <li>Obey all honourable orders.</li> <li>Preserve the weak from the horrors of war.</li>"
    },
    "Ranald": {
        "title": "Ranald, God of Trickery",
        "SOP": "None officially",
        "HOC": "None officially, though rumours persist of a cult leader marked with ten crosses",
        "Orders": "The Crosses, the Brotherhood, the Crooked Fingers",
        "Festivals": "The Day of Folly",
        "Books": "The Riddles Ten, Midnight and the Black Cat, The Great Joke",
        "Symbols": "Crossed fingers, Cats, Magpies",
        "GodDesc": "<p>According to myth, Ranald was once mortal, a gentle bandit who robbed from the rich and gave to the poor. This so charmed Shallya that the goddess fell in love. One fateful day, she found Ranald dying, fatally touched by the plagues of the Fly Lord. Unable to accept this, she let Ranald drink from her holy chalice, granting the rogue eternal life. But it was all a trick &emsp; Ranald had faked it all &emsp; and, laughing, the new god gleefully danced into the heavens. While generally portrayed as a dapper Human wearing a perpetual smile, there is little consistency to the height, weight, skin colour, or even gender of Ranald, though the god is more commonly portrayed as male in the Empire. More a cheerful trickster than outright criminal, Ranald is said to have a love of deflating pride with clever tricks and ruses.</p>",
        "Worshippers": "<p>Ranald most commonly stands as a patron to thieves and rogues, but the cult also attracts gamblers, liars, merchants, tricksters, and the poor and downtrodden.</p><p>The cult of Ranald is, by general perception, a disorganised rabble of charlatans, thieves, and ne’er-do-wells. However, it is more co-ordinated than it appears, and split into three primary orders. The Crosses are the most accepted &emsp; a priesthood overseeing the cult’s gambling-dens, typically using the proceeds to administer to the poor. The Brotherhood is less open, and is somewhat akin to a secret society of merchants &emsp; they use business to bring the pompous and greedy to their knees. Lastly, and most widespread, is the publicly disavowed Crooked Fingers, the thieves, rogues, and liars of Ranald, a group that is roundly distrusted.</p><p>Cultists of Ranald have no conventional garb to identify them, but always work cross symbols into their clothing somewhere, perhaps as a repeating pattern.</p>",
        "Sites": "<p>Ranald has no formal temple organisation, although the cult maintains seemingly unconnected gambling dens in most towns and cities. Small shrines are found in the headquarters of many criminal gangs and merchant houses, and the poorer quarters of many cities have street-corner shrines dedicated to the God of Luck. The latter are often maintained by local ‘shrine clubs’ which operate as both social and religious bodies, and are usually led by one of the Crooked Fingers. Shrines are almost never elaborate, often just a simple, smiling statue with crossed fingers behind the back, or a crudely depicted cat or magpie, often fashioned as if smiling.</p>",
        "Penances": "<p>Ranald’s penances usually involve stealing into locked and guarded locations to recover precious items or leave a token of their presence. Humiliating oppressors of the poor is also common &mdash; perhaps by framing a brutal Watch captain for a ludicrous crime, for example, or locking him in his own cells. Ranald often sends favoured and disfavoured cultists alike on a ‘Pilgrimage of Fingers’, a set of tasks proving capability and loyalty.</p>",
        "Strictures": "<li>One coin in ten belongs to Ranald.</li> <li>Never betray another to the authorities; there is no greater sin than informing.</li> <li>Violence is prohibited except in self-defence.</li> <li>It is better to live free and die than live under oppression.</li> <li>There is no honour among thieves, but there is amongst Ranaldans.</li>"
    },
    "Rhya": {
        "title": "Rhya, Goddess of Fertility",
        "SOP": "None officially",
        "HOC": "None",
        "Orders": "None",
        "Festivals": "Summer Solstice, with equinoxes also celebrated",
        "Books": "<span style=\"font-style: normal !important;'\">None, though many oral traditions exist</span>",
        "Symbols": "Sheaf of wheat, Fruit, Spirals",
        "GodDesc": "<p>Bountiful Rhya is the Goddess of Fertility and Summer, widely known as the Earth Mother and She Who Sustains Life. Though typically depicted as the wife of Taal, myths connect her to many gods, and she has children from many of those relationships. Most commonly portrayed as a tall, beautiful women wreathed in leaves and bedecked in fruit, Rhya’s statues are normally nude, pregnant, and surrounded by her children. Many theologians tie Rhya to the Old Faith, a prehistoric cult comprised of ancient farmers and hunters who wrested a living from the land before the Empire was born, and one still found in secluded communities to this day.</p>",
        "Worshippers": "<p>Rural folk across the Old World venerate Rhya, relying on her to provide the crops upon which their lives depends. Womanfolk comprise the main body of the cult, and most midwives pay at least lip-service to Rhya’s Wisdom, a set of oral traditions surrounding childbirth. Although she is not openly worshipped in the towns and cities &mdash; townsfolk often turning to Shallya in her stead &mdash; her name is frequently tied with Taal’s, so she is still well known amongst such people. </p><p>Because the cult has no great temples and protects no holy books or relics of significance, many scholars believe her worship to be declining, and possibly already dead. Her many cultists do nothing to contradict such talk.</p><p>Rhya’s cultists have no fixed vestment or preferred garb, though greens are very common, as is using plants, flowers, or herbs to accessorise any clothing. They often dress in a fashion considered far too revealing by Sigmarite doctrine, which can cause friction as the Rhyans believe giving in to such prudishness is tantamount to encouraging the Prince of Excess into your lives, as it builds forbidden desires. Devotees of Sigmar invariably disagree, believing abstinence and restricting temptation is a better response to such dangers than indulgence.</p>",
        "Sites": "<p>Rhya has no large temples, though many ancient sites constructed from oghams (standing stones) are centres of worship for her cult, and some still echo each equinox with the cries of fevered celebrants.</p> <p>Shrines to Rhya are usually simple statues of the goddess, often piled high with offerings of food and drink. Older shrines are often made of small standing stones marked with worn, spiralled patterns.</p>",
        "Penances": "<p>Rhyan penances may involve replanting devastated areas, helping broken households, and maintaining sacred groves. It is also common to find Rhyans tasked to protect helpless families, which can often put them at odds with local bailiffs and law enforcement. </p>",
        "Strictures": "<li>Defend families, children, and crops from all harm.</li><li>Never feel shame for the flesh Rhya gave you.</li><li>Life is sacred, do no harm lest another life is in danger.</li><li>Never judge whom another loves.</li><li>Interrupt the work of the Prince of Excess wherever it may thirst.</li>"
    },
    "Shallya": {
        "title": "Shallya, Goddess of Mercy",
        "SOP": "Couronne, Bretonnia",
        "HOC": "Grande Matriarch",
        "Orders": "Order of the Bleeding Heart, Order of the Chalice",
        "Festivals": "None",
        "Books": "The Book of Suffering, Livre des Larmes, The Testament of Pergunda",
        "Symbols": "White doves, Keys, Heart with a drop of blood",
        "GodDesc": "<p>Shallya is the Goddess of Healing, Mercy, and Compassion. She is the daughter of Verena and Morr, and the sister of Myrmidia. Shallya is normally portrayed as a young, beautiful maiden whose eyes are perpetually welling with tears as she weeps for the world’s pain. It is said Shallya’s compassion knows no bounds, and in some myths &mdash; such as the stories of Ranald tricking her into granting him immortality, or Manaan trapping her at the bottom of the sea &mdash; she seems trusting to the point of foolishness. However, her cultists maintain her mercy is available to all, without judgment. True foolishness consists of presuming to judge who is worthy of Shallya’s grace and who is not.</p>",
        "Worshippers": "<p>Most Old Worlders think of Shallya’s cult as composed of healers and physicians, but her worshippers also include many who work to help alleviate suffering of other kinds: charitable souls who help the poor; workers in orphanages, asylums, and refuges; and even brave folk who go in search of lost and missing people on behalf of their loved ones.  The cult is ruled by the far-reaching Order of the Bleeding Heart, which maintains all the temples, hospices, mercyhouses, and other holy sites. The significantly smaller Order of the Chalice tasks its mendicants to cleanse the Fly Lord’s influence, tackling the worst diseases and plagues wherever they may fester.</p><p>Shallya’s cultists all wear white robes, often hooded, with a bleeding heart symbol embroidered on the left breast.</p>",
        "Sites": "<p>The high temple of all Shallya’s cult is in Couronne, Bretonnia, built over a famous healing spring. Locals claim the magical waters were once poured there from the same chalice Shallya used to grant Ranald immortality, which they claim is the holy grail of the Lady, the patron Goddess of Bretonnia. Whatever the truth, it is a popular destination for pilgrims, many of whom travel there to be healed from intractable disease. Elsewhere, every town or city of any size has a temple to Shallya, and most smaller settlements have at least a shrine dedicated to her. Temples of Shallya normally consist of a courtyard with a temple on one side and an infirmary on the other, all constructed in southern styles. Larger temples have smaller subsidiary chapels, commonly endowed by local families, and are often connected to hospitals. Shrines are usually simple, often with the dove or heart of Shallya carved into stone, or with small fountains gushing eternal tears from simple statues.</p>",
        "Penances": "<p>Penances set by Shallya always involve helping the sick, poor, or downtrodden. A cultist might be sent to a village struck by a plague to tend the sick until the disease has passed. Shallya often tasks her servants to help the wounded at war, or patrol popular pilgrimage routes for those unable to complete their journeys due to ill health.</p>",
        "Strictures": "<li>Always render assistance without judgement, based only on a person’s need.</li><li>Never kill except in self-defence or when facing followers of the Fly Lord.</li><li>Hunt down servants of the Fly Lord wherever they may fester.</li><li>Shallya’s work is never done, so turn not to self-indulgence.</li><li>Never take up arms; a walking stick and courage will suffice.</li>"
    },
    "Sigmar": {
        "title": "Sigmar, God of the Empire",
        "SOP": "Altdorf, Reikland",
        "HOC": "The Grand Theogonist",
        "Orders": "Order of the Anvil, Order of the Cleansing Flame, Order of the Silver Hammer, Order of the Torch",
        "Festivals": "Sigmarday (28th Sigmarzeit)",
        "Books": "The Book of Sigmar, Deus Sigmar, The Geistbuch",
        "Symbols": "<em>Ghal-maraz</em> (Sigmar’s Warhammer, ‘Skull-Splitter’), Twin-tailed Comets, Griffons",
        "GodDesc": "<p>Sigmar is the Empire’s patron, and his cult dominates the realm. Because Sigmar was once the emperor, his worship is inextricably interwoven with politics, and three of the cult’s highest-ranking members are directly involved with electing new emperors. According to legend, 2,500 years ago Sigmar’s birth was heralded by a twin-tailed comet, and he was born the first son of the chief of the Unberogen tribe. When older, he received the magical warhammer Ghal-maraz (‘Skull-splitter’) as a gift from the Dwarf king Kurgan Ironbeard for saving his life from Greenskins. Sigmar later allied with the Dwarfs and their combined forces defeated the Greenskins. He was then crowned as the first emperor of the Human tribes he’d united. After fifty years of extraordinary rule, Sigmar mysteriously vanished, only to later ascend to divinity, crowned as a god by Ulric, Sigmar’s patron in life.</p>",
        "Worshippers": "<p>Most folk of the Empire pay at least lip-service to their patron deity. In the most devout provinces, like Reikland, Sigmar worship is an unquestioned part of daily life. Folk attend weekly ‘throngs’ where the lessons of Sigmar are preached. Many also attend temple to train as local militia, confess sins and purify the soul, or receive advice on how to be more like the God-King of old.  Sigmar’s cult is comprised of an uncounted number of different orders. The largest is the Order of the Torch: Sigmar’s priests who lead their local communities. Other orders of importance include: the Order of the Cleansing Flame, comprised of inquisitors and witch hunters; the Order of the Silver Hammer, which includes warrior priests and yet more witch hunters; and the Order of the Anvil, a monastic order concerned with preserving Sigmar’s deeds and laws. The cult also has many templar orders. The most famous are the proud Knights of Sigmar’s Blood, the fanatical Knights of the Fiery Heart, and the militaristic Knights Griffon. Given the cult is so large, there are many different uniforms, vestments, and robes worn, all of which have different colours, cuts, and accessories according to local tradition and requirement.</p>",
        "Sites": "<p>Every city, town, and village in the Empire has at least one temple to Sigmar. The Grand Cathedral in Altdorf is staffed by hundreds of priests and lay workers, and guarded by at least two orders of templars; at the other end of the scale, a village chapel may be visited just once every week by a travelling priest, who serves the needs of several small settlements.  Shrines can be found in most homes, and wayshrines dot every major highway, mostly marked with hammers or comets.</p>",
        "Penances": "<p>Sigmarite cultists may be ordered to destroy a cell of Chaos-worshippers, or expose a corrupt official who is secretly in league with the Ruinous Powers or a foreign power. It is also common to be tasked with building, or rebuilding, local communities to better promote unity and strength in the Empire.</p>",
        "Strictures": "<li>Obey your orders.</li><li>Aid Dwarf-folk, never do them harm.</li><li>Promote the unity of the Empire.</li><li>Bear true allegiance to the imperial throne.</li><li>Root out Greenskins, Chaos worshippers, and foul witches without mercy</li>"
    },
    "Taal": {
        "title": "Taal, God of the Wild",
        "SOP": "Talabheim, Talabecland",
        "HOC": "The Hierarch",
        "Orders": "Order of the Antler, The Longshanks",
        "Festivals": "Spring Equinox, with other equinoxes also celebrated",
        "Books": "The Book of Green, Rites of the Ancient Grove, Tome of Summer’s Path",
        "Symbols": "Antlers, Oaks, Stone axes",
        "GodDesc": "<p>Taal is the God of Wild Places and Animals, and the King of Nature. He is the husband to Rhya, and father to Manaan, and is perceived by Taalites to be the king of the gods, though other cults dispute this. All nature is under his purview, from the snaking rivers to the tallest mountains, from the smallest insect to the greatest beast. He is normally portrayed as a powerfully built, virile man with long, wild hair and great spreading antlers, and is known for his volatile moods and his need to hunt.</p>",
        "Worshippers": "<p>Rural folk across the Old World venerate Taal, and any who make their living in wild places take care not to offend him. Taal is the patron deity of Talabecland in the Empire, where his cult holds significant sway, influencing all levels of society.</p><p>Taal’s cult has a variety of smaller orders dedicated to holy sites and groves throughout the Old World, but two orders drive the cult forwards. The Order of the Antler are the priests of the cult, who are tasked to teach Taal’s ways and protect the wild places from intrusion. </p><p>These Taalites are particularly widespread in Talabecland, and their forest temples are hubs of activity for rural folk. The Longshanks are a mix of warrior-priest and templar who typically wander as individuals, cleansing Taal’s wild places of corruption and ensuring rural communities do nothing to upset Father Taal.</p>",
        "Sites": "<p>Normally, temples to Taal are small, rustic affairs, built of wood and rough stone in a manner unchanged for countless centuries. They are usually sited close to natural features of wonder such as waterfalls, swirling pools, and mountains, and often have small sweat lodges attached. The high temple of Taal in Talabheim is something of an anomaly when compared to this. It appears more a well-maintained, albeit wild, noble garden than a temple, and huge services are held there under the spreading rowan trees weekly. </p>Officially, the Hierarch leads the cult from there, though he spends most of his time in the wild groves of the nearby Taalgrunhaar Forest. Shrines to Taal are barely structures at all. Some old trees are regarded as sacred, and offerings pile up at their bases. Caves, forest groves, and other natural places are also used as shrines, and usually only a local or a devout follower of Taal can find them.<p></p>",
        "Penances": "<p>Taal’s penances usually involve clearing diseased or mutated monsters from wild areas, replanting sacred trees, and maintaining groves important to the cult. A cultist might also be ordered to climb a high mountain and leave a stone on a cairn at the top, or clear an obstruction at the top of a waterfall. Whatever the specific task that must be undertaken, Taal’s penances almost always challenge the cultist to survive in the wild.</p>",
        "Strictures": "<li>Offer a prayer of thanks for every animal taken.</li> <li>Spend a week alone communing with the wilderness every year.</li> <li>Eschew metal armour; clad yourself in the hides of Taal.</li> <li>Rely on your own skill, not the advances of gunpowder or cold technology.</li> <li>Never harm an animal except in self-defence or for food or sacrifice.</li>"
    },
    "Ulric": {
        "title": "Ulric, God of War",
        "SOP": "Middenheim, Middenland",
        "HOC": "Ar-Ulric",
        "Orders": "Order of the Howling Wolf, Order of the Knights of the White Wolf",
        "Festivals": "Campaign Start, Hochwinter, Campaign End",
        "Books": "Liber Lupus, Teutognengeschichte, The Ulric Creed",
        "Symbols": "White Wolves, stylised ‘U’s, claws",
        "GodDesc": "<p>Ulric is the ferocious God of Wolves, Winter, and Warfare. He is the brother of Taal and, according to Ulrican lore, the king of the gods, although other cults dispute this. He is normally portrayed as a massive, heavily bearded barbarian wearing a white wolf-pelt cloak, and bearing a mighty war-axe named Blitzbeil. He’s a distant, harsh, and unforgiving god who expects his cultists to rely on individual strength and prowess. He despises weakness, cowardice, and trickery, and favours the direct approach in all matters.</p>",
        "Worshippers": "<p>Ulric’s cult is strongest in the north of the Empire. The city-state of Middenheim, with its enormous high temple to Ulric, is the heart of his cult, and the god is regarded as the city’s patron. Elsewhere, he is worshipped mainly by warriors and soldiers. Devout Ulricans can usually be spotted by their long hair and beards, for most choose not to cut it, imitating their wild deity. Ulric’s cult is split into just two orders: the priestly Howling Wolves, and the templar White Wolves. The Howling Wolves are not very popular outside Middenland and Nordland, viewed by most folk to be too coarse for this enlightened era. By comparison, the Knights of the White Wolf are enormously popular, easily the largest knightly order in the Empire, and the oldest templar order in the Old World. Ulric’s priests wear black robes with a howling white wolf emblem on the chest. A wolf pelt across the shoulders is also common, as is fur trimmings.</p>",
        "Sites": "<p>Ulric’s high temple is in Middenheim, and the cult’s leader, Ar-Ulric (which means the son of Ulric), has enormous temporal and spiritual sway. At the back of the high temple lies the Flame of Ulric, a huge, ever-burning, argent fire granted by the winter god to guide his people. This miracle is the focus of several pilgrimage routes, and all Ulricans of Middenland are expected to bathe in its cold light at least once in their lives. Smaller temples are found in every city and town of any size, but are grander and more numerous in the north than in the south. Chapels and shrines can be found in barracks and forts throughout the Old World.</p><p>Temples resemble fortified keeps and are normally square. The interior of the main hall is lit by small windows high in the walls, and by an ever-stocked fire in a circular hearth tended by the priesthood. Behind the fire, usually against a rear wall, stands a statue of Ulric enthroned, often flanked by a pair of enormous wolves. Shrines are similar but smaller, with a lamp in place of a fire and small statues just a foot or two tall.</p>",
        "Penances": "<p>Penances set by Ulric are almost always tests of strength, courage, and martial skill. Slaying a powerful monster, or clearing out a nest of Beastmen or outlaws, are typical tasks.</p>",
        "Strictures": "<li>Obey your betters.</li> <li>Defend your honour in all matters, and never refuse a challenge.</li> <li>Stand honest and true; outside an ambush, trickery and deception are forbidden.</li> <li>Only wear pelts from wolves killed by weapons crafted of your own hands.</li> <li>Blackpowder, helmets, crossbows, and technology are not Ulric’s way.</li>"
    },
    "Verena": {
        "title": "Verena, Goddess of Wisdom",
        "SOP": "None",
        "HOC": "None",
        "Orders": "The Order of Scalebearers, the Order of Lorekeepers, the Order of Mysteries, the Order of Everlasting Light",
        "Festivals": "Year Blessing",
        "Books": "Canticum Verena, Eulogium Verena, The Book of Swords",
        "Symbols": "Scales of Justice, Owls, Downward-pointing Swords",
        "GodDesc": "<p>Wise Verena, the Goddess of Learning and Justice, is the wife of dark Morr and the mother of Myrmidia and Shallya. She is generally depicted as a tall, classically beautiful woman, and usually carries a sword and a set of scales. As the patron of justice she is concerned with fairness rather than the letter of the law: she opposes tyranny and oppression as much as crime. </p>",
        "Worshippers": "<p>Verena is worshipped throughout the Old World, especially in the south. Her devout followers include scholars, lawyers, and magistrates, as well as some wizards of the Colleges of Magic, particularly of the Grey and Light orders.</p> <p> The cult of Verena has no rigid hierarchy: it is said that Verena alone heads the cult, and no mortal intermediary is needed because truth is self-evident and requires no interpretation. Temple priests from the Order of Lorekeepers are tasked to preserve knowledge and communicate it to the community. They keep up a voluminous correspondence with each other, exchanging information and news.</p> <p> Priests from the equally influential Order of Scalebearers are much sought after to act as judges, arbitrators, and go-betweens, because of their famed impartiality and mastery of the law. The Order of Mysteries is much smaller and less well-known, and contains warrior-priests who seek lost and forgotten lore, wherever it may lie. The last major order is the Knights of the Everlasting Light, templars famed for their sword skills, sense of fairness, and legendary bad luck. Verena’s cultists usually wear plain white robes, symbolic of pure truth and impartiality.</p>",
        "Sites": "<p>Temples to Verena can be found in most cities and larger towns, generally situated in the administrative or university quarters. Most libraries and court-houses include a shrine to the goddess, and smaller shrines can be found in the homes of many scholars and lawyers. Temples usually have colonnaded facades, with symbols of the goddess and allegorical figures of learning presented in low relief. Inside is a large statue of Verena, normally seated with a book in her lap, a pair of scales in her left hand, and her right hand resting on the hilt of a sword. Smaller rooms lead off from the main temple, including a library and chambers for the attendant priests. Each temple has at least one meeting room where negotiations can take place under the eyes of the goddess.</p> ",
        "Penances": "<p>Penances set by Verena normally involve the recovery or preservation of knowledge, the righting of an injustice, or the resolution of a dispute. Cultists may also be sent to recover a longforgotten book of lore, or to mediate in a difficult quarrel. This could be anything from a farmers’ boundary dispute to unpicking the complicated politics of two realms on the brink of war. </p>",
        "Strictures": "<li>Never refuse to arbitrate a dispute when asked.</li> <li>Always tell the truth without fear or favour.</li> <li>Protect knowledge at all costs.</li> <li>Combat must be a last resort when all alternative routes are fruitless.</li> <li>Never become a tool of injustice or heresy.</li>"
    }
}



var blessByCult = {
    "Manann": ["Battle", "Breath", "Courage", "Hardiness", "Savagery", "Tenacity"],
    "Morr": ["Breath", "Courage", "Fortune", "Righteousness", "Tenacity", "Wisdom"],
    "Myrmidia": ["Battle", "Conscience", "Courage", "Fortune", "Protection", "Righteousness"],
    "Ranald": ["Charisma", "Conscience", "Finesse", "Fortune", "Protection", "Wit"],
    "Rhya": ["Breath", "Conscience", "Grace", "Healing", "Protection", "Recuperation"],
    "Shallya": ["Breath", "Conscience", "Healing", "Protection", "Recuperation", "Tenacity"],
    "Sigmar": ["Battle", "Courage", "Hardiness", "Might", "Protection", "Righteousness"],
    "Taal": ["Battle", "Breath", "Conscience", "Hardiness", "The Hunt", "Savagery"],
    "Ulric": ["Battle", "Courage", "Hardiness", "Might", "Savagery", "Tenacity"],
    "Verena": ["Conscience", "Courage", "Fortune", "Righteousness", "Wisdom", "Wit"],
}

var miracle = [
    {
        "name": "",
        "god": "",
        "range": "",
        "target": "",
        "duration": "",
        "desc": ""
    },
    {
        "name": "Battle",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Weapon Skill.</p>"
    },
    {
        "name": "Breath",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target does not need to breathe and ignores rules for suffocation.</p>"
    },
    {
        "name": "Charisma",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Fellowship.</p>"
    },
    {
        "name": "Conscience",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target must pass an <b>Average (+20) Willpower Test</b> to break any of the Strictures of your deity. If they fail, they are overcome with shame and do not take the action.</p>"
    },
    {
        "name": "Courage",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Willpower.</p>"
    },
    {
        "name": "Finesse",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Dexterity.</p>"
    },
    {
        "name": "Fortune",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target's next failed test may be rerolled. The reroll must stand.</p>"
    },
    {
        "name": "Grace",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Agility.</p>"
    },
    {
        "name": "Hardiness",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Toughness.</p>"
    },
    {
        "name": "Healing",
        "range": "6 yards",
        "target": "1",
        "duration": "Instant",
        "desc": "<p>Your target heals +1 Wound.</p>"
    },
    {
        "name": "The Hunt",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Ballistic Skill.</p>"
    },
    {
        "name": "Might",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Strength.</p>"
    },
    {
        "name": "Protection",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Enemies must make an <b>Average (+20) Willpower Test</b> to attack your target as shame wells within for considering violence. If they fail, they must choose a different target, or a different Action.</p>"
    },
    {
        "name": "Recuperation",
        "range": "6 yards",
        "target": "1",
        "duration": "Instant",
        "desc": "<p>Your target may reduce the duration of 1 disease with which they are inflicted by 1 day. This prayer may only be attempted once per instance of a disease per person.</p>"
    },
    {
        "name": "Righteousness",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target's weapon counts as Magical.</p>"
    },
    {
        "name": "Savagery",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>When your target next inflicts a Critical Wound, roll twice and choose the best result.</p>"
    },
    {
        "name": "Tenacity",
        "range": "6 yards",
        "target": "1",
        "duration": "Instant",
        "desc": "<p>Your target may remove 1 condition.</p>"
    },
    {
        "name": "Wisdom",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Intelligence.</p>"
    },
    {
        "name": "Wit",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Initiative.</p>"
    },
    {
        "name": "As Verena Is My Witness",
        "god": "Verena",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "<p>By calling Verena as your witness, the truth of your words shines out for all to see. For the duration of the Miracle, providing you speak only the truth, all listeners will believe you speak truly. This does not necessarily mean they will agree with your conclusions, of course.</p>"
    },
    {
        "name": "Blind Justice",
        "god": "Verena",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "<p>You articulate prayers concerning Verena’s acute perceptions, able pierce through to the truth of all things. You may make a <b>Simple Challenging (+0) Perception Test</b> to see through spells and Miracles of involving illusion or misdirection. You may also make an <b>Average (+20) Intuition Test</b> to tell whether a character speaking to you is lying.</p><p><b>Note:</b> this will only tell you if the character believes they speak the truth, it will not alert you if they are mistaken.</p>"
    },
    {
        "name": "Shackles of Truth",
        "god": "Verena",
        "range": "Fellowship yards",
        "target": "1",
        "duration": "Fellowship Bonus Rounds",
        "desc": "<p>You appeal to Verena, requesting her judgement concerning a suspected criminal. If your target committed a crime and claims they did not, while affected by this miracle they gain an Entangled Condition that cannot be removed for the duration. If you have falsely accused the target, Verena is displeased with your lack of wisdom: you gain +1 Sin point and must immediately roll on The Wrath of the Gods table.</p>"
    },
    {
        "name": "Sword of Justice",
        "god": "Verena",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "<p>You pray to Verena to guide your blade to strike down the unjust. If wielding a sword, it ignores APs, and counts as Magical. Further, if struck opponents are criminals (as determined by the GM), they must make an <b>Average (+20) Endurance Test</b> or suffer an <em>Unconscious</em> Condition that lasts for at least Fellowship Bonus Rounds. If any crime is perpetrated on the unconscious opponents, you suffer +1 Sin point per crime.</p>"
    },
    {
        "name": "Truth Will Out",
        "god": "Verena",
        "range": "Fellowship Bonus yards",
        "target": "1",
        "duration": "Instant",
        "desc": "<p>You intone prayers of Verena’s ability to find any truth. You may ask the targets a single question. It will be immediately answered truthfully and fully. If desired, targets may attempt to resist, by contesting your SL with an <b>Average (+20) Cool Test</b>. If successful, they may stubbornly refuse to answer. If they achieve +2 SL they may withhold minor information. +4 SL allows them to withhold significant information while +6 SL allows them to lie outright. You will know if they resist successfully, though you will lack specific knowledge about their deceit, or proof of their dishonesty.</p>"
    },
    {
        "name": "Wisdom of the Owl",
        "god": "Verena",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "<p>You call on Verena to instil you with her wisdom and knowledge. You gain a bonus of +20 on all Intelligence Tests while this Miracle is in effect. Further, your pupils dilate widely, and your gaze becomes piercing and unsettling: gain +1 Menacing and <talent>Acute Sense (Sight)</talent> Talent.</p>"
    }
]