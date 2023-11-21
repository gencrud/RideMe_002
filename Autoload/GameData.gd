extends Node
# GameData
const VK_PLAY_VERSION: bool = false
const YANDEX_GAME_VERSION: bool = true

var current_level: Dictionary
var current_track: Level_0

var track_cfg: TrackCfg = load(PathData.TRACK_MODEL).new()
var level_cfg: LevelCfg = load(PathData.LEVEL_MODEL).new()
var player_track_cfg: PlayerTrackCfg = load(PathData.PLAYER_TRACK_MODEL).new()

var window := JavaScript.get_interface("window")
var init_SDK_callback = JavaScript.create_callback(self, "init_SDK")
var player_info = {
	"name": "",
	"is_authenticated": false,
	"hi_score": 0
}
var is_authenticated := false



func _ready():
	# Get the first nedded track from all tracks of all levels
	var level_id: int
	var level_section: String
	var track_resource: String
	
	for section in track_cfg.config.get_sections():
		if track_cfg.get_state(section) in [LevelTrackStates.FAIL, LevelTrackStates.ACTIVE, LevelTrackStates.PASSED]:
			level_id = track_cfg.get_level_id(section)
			level_section = level_cfg.get_section(level_id)
			
			if GameData.level_cfg.get_passed_at(level_section).empty():
				track_resource = track_cfg.get_resource(section)

				if not track_resource.empty():
					current_track = load(track_resource).instance()
					current_level = level_cfg.as_dict(level_section)
					
					if track_cfg.get_state(section) != LevelTrackStates.PASSED:
						break

	ready_YaSDK()


func reload_game(track_id: int):
	var track_section = track_cfg.get_section(track_id) 
	var track_resource = track_cfg.get_resource(track_section)
	var level_id = track_cfg.get_level_id(track_section)
	var level_section = level_cfg.get_section(level_id)
	
	if not track_resource.empty():
		current_track = load(track_resource).instance()
		current_level = level_cfg.as_dict(level_section)


func showAdsBtnVKPlay():
	if not VK_PLAY_VERSION:
		return
	if OS.get_name() == 'HTML5' and OS.has_feature('JavaScript'):
		JavaScript.eval("document.getElementById('showAdsBtn').click();")
	
# YSDK

func ready_YaSDK():
	if not YANDEX_GAME_VERSION:
		return
		
	if window:
		print("GD: Initializing SDK")
		window.initSDK(init_SDK_callback)


func init_SDK(args):
	print('GD: init_SDK', args)


func showAdsBtnYaGame():
	if not YANDEX_GAME_VERSION:
		return
	if OS.get_name() == 'HTML5' and OS.has_feature('JavaScript'):
		JavaScript.eval("document.getElementById('showAdsBtn').click();")

	

func update_player_score(score: int):
	if is_authenticated and score > player_info.hi_score:
		print("updating score")
		player_info.hi_score = score
		window.updatePlayerScore(score)
